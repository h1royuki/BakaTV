const RoomService = require('../services/RoomService');
const container = require('../modules/Container');
const Message = require('../models/Message');

module.exports = (socket) => {

    const io = container.get('io');

    try {
        
        if (socket.room) {

            const roomClients = io.sockets.adapter.rooms[socket.room];

            if (roomClients) {
                if (RoomService.isRoomOwner(socket.id, socket.room)) {

                    const newOwner = Object.keys(roomClients.sockets)[0];

                    RoomService.setRoomOwner(newOwner, socket.room);

                    io.to(newOwner).emit('setOwner');
                    io.to(newOwner).emit('updateStreamState');
                    io.to(newOwner).emit('notify', 'Now you owner');

                    console.log(`Owner change on ${socket.room}`);
                }
            } else {
                console.log(`Room ${socket.room} empty, wait 30 seconds to delete`);
                RoomService.setRoomOwner(null, socket.room);

                setTimeout(() => {
                    if (io.sockets.adapter.rooms[socket.room]) {
                        console.log(`Timer: room ${socket.room} not empty, stream not deleted`);
                    } else {
                        RoomService.destroyRoom(socket.room);
                        console.log(`Timer: room ${socket.room} deleted`);
                    }
                }, 30000);
            }
        }

        io.to(socket.room).emit('messageChat', new Message('service', socket.id, socket.name, 'leave').toJson());
    } catch (err) {
        socket.emit(err.message);
    }
};