const roomsRepository = require('../../../repository/RoomRepository');
const container = require('../../../modules/Container');

module.exports = (progress) => {
    const io = container.get('io');
    const room = container.get('room');
    const currentRoom = roomsRepository.getRoom(room);

    if (progress.frames > 300 && currentRoom.status != 'process') {

        io.to(currentRoom.ownerId).emit('streamStart', currentRoom.id);

        currentRoom.status = 'process';
        roomsRepository.updateRoom(currentRoom);

        console.log(`Change stream ${room} status to 'process'`);

    }
}