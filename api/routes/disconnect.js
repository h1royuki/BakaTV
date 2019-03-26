const RoomService = require('../services/RoomService');
const container = require('../modules/Container');
const Message = require('../models/Message');

module.exports = (socket) => {

    const io = container.get('io');

    try {

        console.log(`Socket ${socket.id} disconnected`);

        if (socket.room) {

            const roomClients = io.sockets.adapter.rooms[socket.id];

            if (roomClients) {
                if (RoomService.isRoomOwner(socket.id, socket.room)) {

                    const newOwner = Object.keys(roomClients.sockets)[0];

                    RoomService.setRoomOwner(newOwner, socket.room);

                    io.to(newOwner).emit('setOwner');
                    io.to(newOwner).emit('notify', 'Now you owner');

                    console.log(`Owner change on ${socket.room}`);
                }
            } else {
                console.log(`Room ${socket.room} empty, wait 30 seconds to delete`);

                RoomService.setRoomOwner(null, socket.room);

                setTimeout(() => {

                    if (roomClients) {
                        RoomService.setStreamStatus(socket.room, 'stop');

                        console.log(`Timer: room ${socket.room} deleted`);
                    } else {
                        console.log(`Timer: room ${socket.room} not empty, stream not deleted`);
                    }
                }, 30000);
            }
        }

        io.to(socket.room).emit('chatMessage', new Message('service', socket.id, socket.name, 'leave').toJson());
    } catch (err) {
        socket.emit(err.message);
    }
};