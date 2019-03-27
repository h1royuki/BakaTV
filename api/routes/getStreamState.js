const RoomService = require('../services/RoomService');

module.exports = (stream, socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {
            
            socket.broadcast.to(socket.room).emit('updateStreamState', stream);
            
            setTimeout(() => {
                socket.emit('getStreamState');
            }, 1000);

        } else {
            throw new Error('You not room owner');
        }
    } catch (err) {
        socket.emit('err', err.message);
    }
}