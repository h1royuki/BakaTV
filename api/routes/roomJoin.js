const RoomRepository = require('../repository/RoomRepository');
const NotFoundError = require('../errors/NotFoundError');

module.exports = (room, socket) => {
    try {
        const currentRoom = RoomRepository.getRoom(room);

        if(!currentRoom.ownerId) {
            currentRoom.ownerId = socket.id;
            RoomRepository.updateRoom(currentRoom);
        }

        socket.room = room;
        socket.join(room);
        socket.emit('roomJoin', currentRoom.toJson(socket.id));
    } catch (err) {
        socket.emit('err', err.message);
        if (err instanceof NotFoundError) {
            socket.emit('notFound');
        }
    }
};      