const roomService = require('../../services/RoomService');

module.exports = (socket, room) => {
    try {
        console.log(socket.id);
        const stream = roomService.getRoom(room).getStream();
        stream.stop();
    } catch (err) {
        socket.emit('err', err.message);
    }
}