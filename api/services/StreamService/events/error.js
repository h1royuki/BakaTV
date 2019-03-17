const io = require('../../../socket');
const roomService = require('../../RoomService');

module.exports = (room, error) => {
    io.to(room).emit('streamStop');
    io.to(room).emit('err', 'Stream stopped');
    roomService.removeRoom(room);
    console.log(error);
    console.log(`Stream on ${room} error`);
}