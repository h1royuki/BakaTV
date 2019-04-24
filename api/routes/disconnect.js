const RoomService = require('../services/RoomService');
const UserService = require('../services/UserService');
const SocketIOService = require('../services/SocketIOService');
const Message = require('../entity/Message');

module.exports = async (socket) => {
    try {
        if (socket.room) {
            const user = await UserService.getUser(socket.userId);
            const message = new Message('service', user.name, 'leave');
            
            socket.broadcast.to(socket.room).emit('messageChat', message);

            await UserService.deleteUserFromRoom(socket.userId, socket.room);

            if (await UserService.getOnlineRoomUsersCount(socket.room) > 0) {
                if (await RoomService.isRoomOwner(socket.userId, socket.room)) {
                    const newOwnerId = await UserService.getRandomRoomUser(socket.room);
                    const socketId = await UserService.getSocketId(newOwnerId);

                    await RoomService.setRoomOwner(newOwnerId, socket.room);

                    SocketIOService.emitId(socketId, 'updateRoomOwner');
                    SocketIOService.emitId(socketId, 'notify', 'Now you owner');

                    console.log(`Owner change on ${socket.room}`);
                }
            } else { 
                await RoomService.setRoomOwner(null, socket.room);
            }

            const roomUsers = await UserService.getRoomUsers(socket.room);
            SocketIOService.emitId(socket.room, 'updateRoomUsers', roomUsers);
        }

    } catch (err) {
        console.log(err.message);
    }
};