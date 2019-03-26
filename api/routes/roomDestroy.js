const RoomService = require('../services/RoomService');
const container = require('../modules/Container');

module.exports = (socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {

            const io = container.get('io');

            io.to(socket.room).emit('roomDestroy');
            io.to(socket.room).emit('notify', `Stream destroyed by owner`);

            RoomService.destroyRoom(socket.room);

            console.log(`Room ${socket.room} destroyed`)
        } else {
            throw new Error('You not room owner');
        }
    } catch(err) {
        socket.emit('err', `Error destroying room: ${err.message}`);
    }
}