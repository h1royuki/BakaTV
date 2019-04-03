const RoomService = require('../services/RoomService');
const UserService = require('../services/UserService');
const SocketIOService = require('../services/SocketIOService');
const Message = require('../models/Message');

module.exports = (socket) => {
    try {

        const user = UserService.getUserFromRoom(socket.id, socket.room);
        const message = new Message('service', user.id, user.name, 'leave');
        SocketIOService.emitId(socket.room, 'messageChat', message.toJson());
        
        UserService.deleteUserFromRoom(socket.id, socket.room);

        if (socket.room) {
            if (UserService.getOnlineUsersCount(socket.room) > 0) {
                if (RoomService.isRoomOwner(socket.id, socket.room)) {
                    const newOwner = UserService.getFirstRoomUser(socket.room);
                    
                    RoomService.setRoomOwner(newOwner, socket.room);
                    SocketIOService.emitId(socket.room, 'updateRoomOwner', newOwner);
                    SocketIOService.emitId(newOwner, 'notify', 'Now you owner');

                    console.log(`Owner change on ${socket.room}`);
                }
            } else {    
                RoomService.setRoomOwner(null, socket.room);

                console.log(`Room ${socket.room} empty, wait 30 seconds to delete`);

                const timeout = setTimeout(() => {

                    if (UserService.getOnlineUsersCount(socket.room)) {
                        RoomService.destroyRoom(socket.room);
                        console.log(`Timer: room ${socket.room} deleted`);
                    }
                }, 30000);

                RoomService.addRoomTimeout(socket.room, 'destroy', timeout);
            }
        }
        const roomUsers = UserService.getRoomUsers(socket.room);
        SocketIOService.emitId(socket.room, 'updateRoomUsers', roomUsers);

    } catch (err) {
        console.log(err.message);
    }
};