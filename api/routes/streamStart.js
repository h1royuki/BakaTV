const container = require('../modules/Container');
const Room = require('../models/Room')
const StreamService = require('../services/StreamService');
const roomsRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser')

module.exports = (film, socket) => {
        KinogoParser.getMovieURL(film.url).then((url) => {
                const room = new Room(socket.id, film);
                container.set('room', room.id);

                const streamService = new StreamService(url);

                room.stream = streamService.start();
                room.streamId = streamService.getStreamId();

                roomsRepository.addRoom(room);
        }).catch((err) => {
                socket.emit('err', err.message);
        })

};