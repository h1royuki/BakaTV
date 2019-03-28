const RoomService = require('../services/RoomService');

module.exports = (stream, socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {

            RoomService.updateStreamState(socket.room, stream);

            socket.broadcast.to(socket.room).emit('getStreamState', RoomService.getStreamState(socket.room));

            setTimeout(() => {
                socket.emit('updateStreamState');
            }, 1000);

        } else {
            throw new Error('You not room owner');
        }
    } catch (err) {
        socket.emit('err', err.message);
    }
}