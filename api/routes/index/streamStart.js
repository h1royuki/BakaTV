const container = require('../../modules/Container');
const Room = require('../../models/Room')
const StreamService = require('../../services/StreamService');
const roomsRepository = require('../../repository/RoomRepository');
const RutrackerParser = require('../../parsers/RutrackerParser');
const TorrentService = require('../../services/TorrentService')

module.exports = (film, socket) => {
        try {
                RutrackerParser.getTorrentFile(film.id).then((path) => {
                        TorrentService.startDownload(path).then((torrent) => {
                                const room = new Room(socket, film, torrent);
                                container.set('room', room.getId());

                                const path = TorrentService.getFile(torrent);
                                const streamService = new StreamService(path);

                                room.setStream(streamService.start());
                                room.setStreamId(streamService.getStreamId());
                                roomsRepository.addRoom(room);
                        }).catch((err) => {
                                socket.emit('err', 'Error start downloading: ' + err.message);
                        })
                }).catch((err) => {
                        socket.emit('err', 'Error get torrent file: ' + err.message);
                })

        } catch (err) {
                socket.emit('err', err.message);
        }

};