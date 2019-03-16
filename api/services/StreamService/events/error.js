const io = require('../../../socket');
const roomService = require('../../RoomService');

module.exports = (room, error) => {
    io.to(room).emit('stop');
    io.to(room).emit('err', 'Stream stopped');
    roomService.removeRoom(room);
    console.log(`Stream on ${room} error`);
}