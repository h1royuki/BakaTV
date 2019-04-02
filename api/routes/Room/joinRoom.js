const RoomService = require('../../services/RoomService');
const NotFoundError = require('../../errors/NotFoundError');

module.exports = (room, socket) => {
    try {

        socket.room = room;
        socket.join(room);

        if (!RoomService.getOwner(room)) {
            RoomService.setRoomOwner(socket.id, room);
            RoomService.removeRoomTimeout(room, 'destroy');
        }
        
        socket.emit('joinRoom', RoomService.getRoomState(socket.id, room));

    } catch (err) {
        socket.emit('err', err.message);
        if (err instanceof NotFoundError) {
            socket.emit('notFound');
        }
    }
};      