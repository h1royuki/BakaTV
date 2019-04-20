const RoomService = require('../../services/RoomService');
const UserService = require('../../services/UserService');

module.exports = async (roomId, socket) => {
    try {

        if (await UserService.isUserJoinedToRoom(roomId, socket.userId)) {
            throw new Error('You already joined to room');
        }

        socket.room = roomId;
        socket.join(roomId);

        if (!await RoomService.getOwner(roomId)) {
            await RoomService.setRoomOwner(socket.userId, roomId);
        }

        await UserService.addUserToRoom(socket.userId, roomId);
        const ownerId = await RoomService.getOwner(roomId);

        socket.emit('joinRoom', ownerId);
    } catch (err) {
        socket.emit('err', err.message);
        socket.emit('notFound');
    }
};      