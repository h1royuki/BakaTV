const rp = require('request-promise-native');
const baseURL = 'https://w8.zona.plus';

class KinotochkaParser {

    searchFilms(query) {
        return this._baseGet('/ajax/suggest/' + query);

    }

    getFilmURL(id) {

        return this._baseGet('/movies/' + id).then((json) => {
            let link = '/ajax/video/' + json.movie.mobi_link_id
            return this._baseGet('/ajax/video/' + json.movie.mobi_link_id).then((json) => {
                return json.url;
            })
        })

    }
    _baseGet(url) {
        const options = {
            method: 'GET',
            uri: baseURL + encodeURI(url),
            json: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        return rp(options)
            .then((json) => {
                return json;
            })
            .catch((err) => {
                throw new Error('Error get' + url);
            });
    }
}

module.exports = new KinotochkaParser;