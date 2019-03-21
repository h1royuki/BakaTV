const rp = require('request-promise-native');
const cheerio = require('cheerio');
const baseURL = 'http://kinotochka.club';

class KinotochkaParser {

    searchFilms(query) {
        const options = {
            method: 'POST',
            uri: baseURL + '/index.php?do=search',
            form: {
                'do': 'search',
                'subaction': 'search',
                'story': query,
                'catlist[]': '2'
            },

            transform: function (body) {
                return cheerio.load(body);
            }
        };

        return rp(options)
            .then(($) => {
                let items = [];
                $('.sres-wrap').map(function (i, el) {
                    let item = {};

                    item.name_id = $(this).attr('href').match(/\/(\d*)\-/)[1];
                    item.cover = $(this).children('.sres-img').children('img').attr('src');
                    item.name_rus = $(this).children('.sres-text').children('h2').text();

                    if (item.name_rus.match(/^.*\(\d*\)$/)) {
                        items.push(item);
                    }
                });
                return this._validateItems(items).then((items) => {
                    return items;
                });

            })
            .catch((err) => {
                throw new Error('Error search');
            });
    }

    _validateItems(items) {
        let promises = [];

        for (let i = 0; i < items.length; i++) {
            promises.push(this.getFilmURL(items[i].name_id).then((url) => {
                if (!url.match(/(...*).mp4/)) {
                    delete items[i];
                }
            }
            ));
        }
        return Promise.all(promises).then(() => {
            return items;
        })
    }

    getMovieURL(id) {
        const options = {
            method: 'GET',
            uri: baseURL + '/embed/' + id,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        return rp(options)
            .then(($) => {
                return $('.ui-tabs-panel')
                    .children('input')
                    .attr('value')
                    .replace(/(.*)\[(\d*)\,(\d*)\](.*)/, "$1$3$4");
            })
            .catch((err) => {
                throw new Error('Error get movie URL');
            });
    }
}

module.exports = new KinotochkaParser;