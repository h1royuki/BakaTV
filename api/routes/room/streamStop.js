const roomsRepository = require('../../repository/RoomRepository');

module.exports = (room, socket) => {
    try {
        const stream = roomsRepository.getRoom(room).getStream();
        stream.kill();
    } catch (err) {
        socket.emit('err', err.message);
    }
}