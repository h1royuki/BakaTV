const io = require('../../../socket');
const roomService = require('../../RoomService');

module.exports = (room) => {
    io.to(room).emit('streamStop');
    io.to(room).emit('err', 'Stream ended');
    roomService.removeRoom(room);

    console.log(`Stream on ${room} ended`);
}