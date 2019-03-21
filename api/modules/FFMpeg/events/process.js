const roomsRepository = require('../../../repository/RoomRepository');
const container = require('../../../modules/Container');

module.exports = (progress) => {

    const room = container.get('room');
    const currentRoom = roomsRepository.getRoom(room);

    if (progress.frames > 300 && currentRoom.status != 'process') {

        currentRoom.owner.emit('streamStart', currentRoom.id);

        currentRoom.status = 'process';
        roomsRepository.updateRoom(currentRoom);

        console.log(`Change stream ${room} status to 'process'`);

    }
}