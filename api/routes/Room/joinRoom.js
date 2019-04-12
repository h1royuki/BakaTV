const RoomService = require('../../services/RoomService');
const NotFoundError = require('../../errors/NotFoundError');

module.exports = (room, socket) => {
    try {

        socket.room = room;
        socket.join(room);

        if (!RoomService.getOwner(room)) {
            RoomService.setRoomOwner(socket.id, room);
            RoomService.removeRoomTimeout(room, 'destroy');
            console.log(`User joined to ${room}, timeout remove`);
        }
        
        socket.emit('joinRoom', {userId: socket.id, room: RoomService.getRoom(room)});

    } catch (err) {
        socket.emit('err', err.message);
    }
};      