const RuTrackerApi = require('rutracker-api-2');
const container = require('../modules/Container');
const fs = require('fs');
const cookies = container.get('rtcookie');

const categories = ['2090', '2221', '2091', '2092', '2093', '2200', '1950', '2540', '934'];

class RuTrackerParser {

    constructor() {
        this._login = false;
    }

    login() {
        this._client = new RuTrackerApi();
        return this._client.login(process.env.RUTRACKER_LOGIN, process.env.RUTRACKER_PASS).then((cookie) => {
            container.set('rtcookie', cookie);
            this._login = true;
        }).catch((err) => {
            throw new Error('Error login to rutracker.org');
        });
    }

    searchFilms(query) {
        if (this._login) {
            return this._client.search(query, 'seeds', false).then((items) => {
                items.forEach((element, key) => {
                    if (!categories.includes(element.category.id) ||
                        element.size < 1073741824 ||
                        element.size > 5368709120 ||
                        element.seeds < 10) {
                        delete items[key];
                        return;
                    }
                });
                return this._getCovers(items).then((items) => {
                    return items;
                }).catch((err) => {
                    throw new Error(`Error search ${query}`);
                });
            })
        } else {
            return this.login().then(() => {
                return this.searchFilms(query);
            })
        }
    }

    getTorrentFile(id) {
        if (this._login) {
            return this._client.download(id).then((stream) => {
                return new Promise((resolve, reject) => {
                    stream.pipe(fs.createWriteStream(process.env.TORRENTS_FOLDER + id + '.torrent'));
                    stream.on('end', () => {
                        resolve(process.env.TORRENTS_FOLDER + id + '.torrent');
                    })
                    stream.on('error', () => {
                        reject();
                    })
                })
            }).catch((err) => {
                throw new Error(`Error download ${id}`);
            })
        } else {
            return this.login().then(() => {
                return this.getTorrentFile(id);
            })
        }
    }

    _getCovers(items) {
        if (this._login) {
            const promises = [];
            items.forEach((element, key) => {
                promises.push(this._client.getFullFileInfo(element.id).then((info) => {
                    items[key].cover = info.img;
                }));
            })
            return Promise.all(promises).then(() => {
                return items;
            }).catch((err) => {
                throw new Error('Error get cover');
            })
        } else {
            return this.login().then(() => {
                return this._getCovers(items);
            })
        }
    }

};

module.exports = new RuTrackerParser();