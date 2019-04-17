const RoomService = require('../services/RoomService');
const UserService = require('../services/UserService');
const SocketIOService = require('../services/SocketIOService');
const Message = require('../entity/Room/Chat/Message');

module.exports = async (socket) => {
    try {
        if (socket.room) {
            const user = await UserService.getUserFromRoom(socket.userId, socket.room);
            const message = new Message('service', user.id, user.name, 'leave');
            
            SocketIOService.emitId(socket.room, 'messageChat', message);

            await UserService.deleteUserFromRoom(socket.userId, socket.room);

            console.log(await UserService.getOnlineUsersCount(socket.room));

            if (await UserService.getOnlineUsersCount(socket.room) > 0) {
                if (RoomService.isRoomOwner(socket.userId, socket.room)) {
                    const newOwner = await UserService.getNextRoomUser(socket.userId, socket.room);
                    console.log(newOwner);

                    await RoomService.setRoomOwner(newOwner.id, socket.room);

                    SocketIOService.emitId(socket.room, 'updateRoomOwner', newOwner.id);
                    SocketIOService.emitId(newOwner.socketId, 'notify', 'Now you owner');

                    console.log(`Owner change on ${socket.room}`);
                }
            } else { 
                console.log('owner user')
                await RoomService.setRoomOwner(null, socket.room);
            }

            const roomUsers = await UserService.getRoomUsers(socket.room);
            SocketIOService.emitId(socket.room, 'updateRoomUsers', roomUsers);
        }

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
};