const io = require('../../modules/io');
const RoomService = require('../../services/RoomService');


module.exports = (socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {

            io.to(socket.room).emit('destroyRoom');
            io.to(socket.room).emit('notify', `Room destroyed by owner`);

            RoomService.destroyRoom(socket.room);

            console.log(`Room ${socket.room} destroyed`)
        } else {
            throw new Error('You not room owner');
        }
    } catch(err) {
        socket.emit('err', `Error destroying room: ${err.message}`);
    }
}