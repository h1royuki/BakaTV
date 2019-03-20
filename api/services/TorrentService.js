const WebTorrent = require('../modules/WebTorrent');
var rimraf = require("rimraf");

class TorrentService {

    startDownload(filePath) {
        return WebTorrent.addFile(filePath).then((torrent) => {
            return torrent;
        })
    }

    removeTorrent(torrent) {
        if (torrent) {
            console.log(`Torrent ${torrent.path} desroyed`);

            torrent.destroy(() => {
                this._removeFiles(torrent.path);
            });
        }
    }

    getFile(torrent) {
        console.log(torrent.path + '/' + torrent.files[0].name)
        return `${torrent.path}/${torrent.files[0].name}`;
    }

    _removeFiles(directory) {
        rimraf(directory, () => {
            console.log(`Directory ${directory} remove`)
        })

    }
}

module.exports = new TorrentService();