const io = require('../../socket');
const roomService = require('../../services/RoomService');
const NotFoundError = require('../../errors/NotFoundError');

module.exports = (room, socket) => {
    try {

        const currentRoom = roomService.getRoom(room);
        socket.join(currentRoom.getId());
        socket.emit('get', currentRoom.toJson());
    } catch (err) {
        socket.emit('err', err.message);
        if (err instanceof NotFoundError) {
            socket.emit('404');
        }
    }
};  