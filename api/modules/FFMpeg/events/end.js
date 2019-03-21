const container = require('../../Container');
const roomsRepository = require('../../../repository/RoomRepository');

module.exports = (error) => {

    const io = container.get('io');
    const room = roomsRepository.getCurrentRoom();
  
    roomsRepository.removeRoom(room.id);

    if(room.status == 'start') {
        io.to(room.ownerId).emit('err', 'Stream crashed: ' + error);
        console.log(`Stream on ${room.id} crashed: ` + error);
    } else {
        console.log(`Stream on ${room.id} ended`);
        io.to(room.id).emit('streamStop');
        io.to(room.id).emit('err', 'Stream stopped');
    }
}