const roomsRepository = require('../repository/RoomRepository');

module.exports = (socket) => {
    try {

        const currentRoom = roomsRepository.getCurrentRoom();

        if (currentRoom.ownerId == socket.id) {
            currentRoom.stream.kill();
        } else {
            throw new Error('You not room owner');
        }
    } catch (err) {
        socket.emit('err', err.message);
    }
}