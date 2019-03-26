const container = require('../modules/Container');
const RoomService = require('../services/RoomService');

module.exports = (status, socket) => {
    try {
        if (RoomService.isRoomOwner(socket.id, socket.room)) {

            const io = container.get('io');

            const newStatus = RoomService.setStreamStatus(socket.room, status);
            
            io.to(socket.room).emit('streamControl', newStatus);

            console.log(`Change stream ${socket.room} status to ${status}`)
        } else {
            throw new Error('You not room owner');
        }
    } catch (err) {
        socket.emit('err', err.message);
    }
}