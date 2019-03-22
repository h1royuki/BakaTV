const roomsRepository = require('../../../repository/RoomRepository');
const container = require('../../../modules/Container');

module.exports = (room, progress) => {
    const io = container.get('io');
    const currentRoom = roomsRepository.getRoom(room);

    if (progress.frames > 400 && currentRoom.status != 'process') {

        io.to(currentRoom.ownerId).emit('streamStart', currentRoom.id);

        currentRoom.status = 'process';
        roomsRepository.updateRoom(currentRoom);

        console.log(`Change stream ${currentRoom.id} status to 'process'`);

    }
}