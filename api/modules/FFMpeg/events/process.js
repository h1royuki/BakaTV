const roomsRepository = require('../../../repository/RoomRepository');
const container = require('../../../modules/Container');

module.exports = (progress) => {

    const room = container.get('room');
    const currentRoom = roomsRepository.getRoom(room);

    if (progress.frames > 300 && currentRoom.getStatus() != 'process') {

        currentRoom.getOwner().emit('streamStart', currentRoom.getId());

        currentRoom.setStatus('process');
        roomsRepository.updateRoom(currentRoom);

        console.log(`Change stream ${room} status to 'process'`);

    }
}