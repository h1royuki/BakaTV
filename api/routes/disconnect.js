const RoomRepository = require('../repository/RoomRepository')
const container = require('../modules/Container');
const Message = require('../models/Message');

module.exports = (socket) => {

    const io = container.get('io');
    try {

        console.log(`Socket ${socket.id} disconnected`);

        if (socket.room) {
            const room = RoomRepository.getRoom(socket.room);
            const clients = io.sockets.adapter.rooms[room.id];

            if (clients) {
                if (socket.id == room.ownerId) {
                    room.ownerId = Object.keys(clients.sockets)[0];
                    RoomRepository.updateRoom(room);

                    io.to(room.ownerId).emit('setOwner');
                    io.to(room.ownerId).emit('notify', 'Now you owner');

                    console.log(`Owner change on ${room.id}`);
                }
            } else {
                console.log(`Room ${room.id} empty, wait 30 seconds to delete`);

                room.ownerId = null;
                RoomRepository.updateRoom(room);

                setTimeout(() => {
                    if (!io.sockets.adapter.rooms[room.id]) {
                        room.stream.kill();

                        console.log(`Timer: room ${room.id} deleted`);
                    } else {
                        console.log(`Timer: room ${room.id} not empty, stream not deleted`);
                    }
                }, 30000);
            }
        }

        io.to(socket.room).emit('chatMessage', new Message('service', socket.id, socket.name, 'leave').toJson());
    } catch (err) {
        socket.emit(err.message);
    }
};