const RoomService = require('../services/RoomService');

module.exports = (status, socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {

            RoomService.updatePlayerStatus(socket.room, status);

            socket.broadcast.to(socket.room).emit('getPlayerStatus', status);
            
        } else {
            throw new Error('You not room owner');
        }
    } catch (err) {
        socket.emit('err', err.message);
    }
}