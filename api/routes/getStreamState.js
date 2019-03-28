const RoomService = require('../services/RoomService');

module.exports = (socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {
            socket.emit('getStreamState', RoomService.getStreamState(socket.room));

            setTimeout(() => {
                socket.emit('updateStreamState');
            }, 2000);

        } else {
            throw new Error('You not room owner');
        }
    } catch (err) {
        socket.emit('err', err.message);
    }
}