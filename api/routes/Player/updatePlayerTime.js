const RoomService = require('../../services/RoomService');
const PlayerService = require('../../services/PlayerService');

module.exports = (time, socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {
            
            PlayerService.updatePlayerTime(socket.room, time);

            socket.broadcast.to(socket.room).emit('getPlayerTime', time);

        } else {
            throw new Error('You not room owner');
        }
    } catch (err) {
        socket.emit('err', err.message);
    }
}