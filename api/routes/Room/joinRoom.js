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

        const isRoomCreator = await RoomService.isRoomCreator(socket.userId, socket.room);
        const isRoomOwner = await RoomService.isRoomOwner(socket.userId, socket.room);

        socket.emit('joinRoom', {owner: isRoomOwner, creator: isRoomCreator});
    } catch (err) {
        socket.emit('err', err.message);
        socket.emit('notFound');
    }
};      