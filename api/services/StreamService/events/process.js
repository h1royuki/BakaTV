const io = require('../../../socket');
const roomService = require('../../RoomService');

module.exports = (progress, room) => {

    const currentRoom = roomService.getRoom(room);

    if (progress.frames > 300 && currentRoom.getStatus() != 'process') {
        io.to(room).emit('start', currentRoom.getId());
        currentRoom.setStatus('process');
        roomService.updateRoom(currentRoom);

        console.log(`Change stream ${room} status to 'process'`);

    }
}