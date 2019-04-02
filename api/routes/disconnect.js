const RoomService = require('../services/RoomService');
const ChatService = require('../services/ChatService');
const SocketIOService = require('../services/SocketIOService');
const Message = require('../models/Message');

module.exports = (socket) => {
    try {
        if (socket.room) {
            SocketIOService.getRoomSockets(socket.room);
            if (SocketIOService.getRoomSockets(socket.room)) {
                if (RoomService.isRoomOwner(socket.id, socket.room)) {
                    const newOwner = SocketIOService.getFirstSocketOfRoom(socket.room);
                    
                    RoomService.setRoomOwner(newOwner, socket.room);
                    SocketIOService.emitId(newOwner, 'setOwner');
                    SocketIOService.emitId(newOwner, 'notify', 'Now you owner');

                    console.log(`Owner change on ${socket.room}`);
                }
            } else {    
                RoomService.setRoomOwner(null, socket.room);

                console.log(`Room ${socket.room} empty, wait 30 seconds to delete`);

                const timeout = setTimeout(() => {

                    if (!SocketIOService.getRoomSockets(socket.room)) {
                        RoomService.destroyRoom(socket.room);
                        console.log(`Timer: room ${socket.room} deleted`);
                    }
                }, 30000);

                RoomService.addRoomTimeout(socket.room, 'destroy', timeout);
            }
        }

        const user = ChatService.getUserFromChat(socket.id, socket.room);
        const message = new Message('service', user.id, user.name, 'leave');
        SocketIOService.emitId(socket.room, 'messageChat', message.toJson());
        
        ChatService.deleteUserFromChat(socket.id, socket.room);
        const chatUsers = ChatService.getChatUsers(socket.room);
        SocketIOService.emitId(socket.room, 'updateChatUsers', chatUsers);

    } catch (err) {
        console.log(err.message);
    }
};