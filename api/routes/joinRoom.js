const container = require('../modules/Container');
const RoomRepository = require('../repository/RoomRepository');
const NotFoundError = require('../errors/NotFoundError');

module.exports = (room, socket) => {
    try {

        const io = container.get('io');
        const currentRoom = RoomRepository.getRoom(room);

        if (!currentRoom.ownerId) {
            currentRoom.ownerId = socket.id;
            socket.emit('getStreamState');
            RoomRepository.updateRoom(currentRoom);
        }

        if (currentRoom.ownerId == socket.id) {;
            socket.emit('getStreamState');
        }

        socket.room = room;
        socket.join(room);
        socket.emit('joinRoom', currentRoom.toJson(socket.id));
    } catch (err) {
        socket.emit('err', err.message);
        if (err instanceof NotFoundError) {
            socket.emit('notFound');
        }
    }
};      