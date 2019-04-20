const RoomService = require('../services/RoomService');

const exclude = ['createRoom', 'searchFilms', 'reconnectToRoom', 'leaveFromRoom'];

module.exports = async (socket, packet, next) => {
    try {
        if (exclude.includes(packet[0])) {
            return next();
        }

        if (packet[0] == 'joinRoom') {

            const keys = await RoomService.isRoomExist(packet[1]);

            if (keys.length == 0) {
                throw new Error('Room not found');
            }
        } else {
            const keys = await RoomService.isRoomExist(socket.room);

            if (keys.length == 0) {
                throw new Error('Room not found');
            }
        }
        return next();
    } catch (err) {
        socket.emit('notFound');
        socket.emit('err', err.message);
    }
}