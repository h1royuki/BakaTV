const WT = require('webtorrent');
const client = new WT();


class WebTorrent {
    constructor() {
        this._client = client;
        this._client.on('torrent', torrent => console.log(`Torrent ${torrent.infoHash} started`)); 

    }

    addFile(path) {
        return new Promise((resolve, reject) => {
            client.add(path, (torrent) => {
                torrent.on('download', function (bytes) {
                    if (torrent.progress > 0.01) {
                        resolve(torrent);
                    }
                });
                torrent.on('error', (error) => {
                    reject(error);
                });
            });
            client.on('error', (error) => {
                reject(error);
            });
        })
    }

    
}

module.exports = new WebTorrent();

