const roomService = require('../../services/RoomService');

module.exports = (socket, room) => {
    try {
        const stream = roomService.getRoom(room).getStream();
        stream.stop();
    } catch (err) {
        socket.emit('err', err.message);
    }
}