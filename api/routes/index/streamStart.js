const Room = require('../../models/Room')
const StreamService = require('../../services/StreamService');
const roomService = require('../../services/RoomService');
const KinotochkaParser = require('../../parsers/KinotochkaParser');

module.exports = (film, socket) => {
        try {
                KinotochkaParser.getFilmURL(film.name_id).then((url) => {
                        const room = new Room(socket, film);
                        const streamService = new StreamService(url, room.getId());

                        room.addStream(streamService.start());
                        roomService.addRoom(room);
                })

        } catch (err) {
                console.log(err);
                socket.emit('err', err.message);
        }

};