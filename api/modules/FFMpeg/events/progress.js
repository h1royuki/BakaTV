const RoomRepository = require('../../../repository/RoomRepository');
const container = require('../../Container');

module.exports = (room, info) => {
    const io = container.get('io');
    const currentRoom = RoomRepository.getRoom(room);

    currentRoom.stream.progressTime = info.timemark;

    if (info.frames > 400 && (currentRoom.status == 'start' || currentRoom.status == 'pause')) {
        currentRoom.status = 'work';
        io.to(room).emit('streamControl', 'work');
        console.log(`Change stream ${room} status to 'work'`);
    }
    RoomRepository.updateRoom(currentRoom);
}