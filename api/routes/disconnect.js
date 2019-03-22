const RoomRepository = require('../repository/RoomRepository')
const container = require('../modules/Container');
const Message = require('../models/Message');

module.exports = (socket) => {

    const io = container.get('io');
    try {
        if (socket.room) {
            const room = RoomRepository.getRoom(socket.room);
            if (socket.id == room.ownerId) {
                const clients = io.sockets.adapter.rooms[room.id];

                if (clients) {
                    room.ownerId = Object.keys(clients.sockets)[0];
                    RoomRepository.updateRoom(room);
                    io.to(room.ownerId).emit('setOwner');
                    io.to(room.ownerId).emit('notify', 'Now you owner');
                    console.log(`Owner change on ${room.id}`);
                } else {
                    room.stream.kill();
                }
            }
        }

        io.to(socket.room).emit('chatMessage', new Message('service', socket.id, socket.name, 'leave').toJson());

        console.log(`Socket ${socket.id} disconnected`);
    } catch (err) {
        socket.emit(err.message);
    }
};