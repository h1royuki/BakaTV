const container = require('../../Container');
const roomsRepository = require('../../../repository/RoomRepository');

module.exports = (room, error) => {

    const io = container.get('io');
    const currentRoom = roomsRepository.getRoom(room);
  
    roomsRepository.removeRoom(currentRoom.id);

    if(room.status == 'start') {
        io.to(currentRoom.ownerId).emit('err', 'Stream crashed: ' + error);
        console.log(`Stream on ${currentRoom.id} crashed: ` + error);
    } else {
        console.log(`Stream on ${currentRoom.id} ended`);
        io.to(currentRoom.id).emit('streamStop');
        io.to(currentRoom.id).emit('notify', 'Stream ended');
    }
}