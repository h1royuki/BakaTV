const io = require('../../../socket');
const roomService = require('../../RoomService');

module.exports = (room) => {
    io.to(room).emit('stop');
    io.to(room).emit('err', 'Stream stopped');
    roomService.removeRoom(room);
    console.log(`Stream on ${room} error`);
}