const Room = require('../../models/Room')
const StreamService = require('../../services/stream');
const roomService = require('../../services/RoomService');

module.exports = (url, socket) => {
        try {
                const room = new Room();
                const streamService = new StreamService(url, room.getId());
                socket.join(room.getId());
                room.addStream(streamService.start());
                roomService.addRoom(room);

        } catch (err) {
                socket.emit('err', err.message);
        }

};