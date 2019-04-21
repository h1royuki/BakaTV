const Message = require('../../entity/Room/Chat/Message');
const UserService = require('../../services/UserService');
const SocketIOService = require('../../services/SocketIOService');


module.exports = async (socket) => {

    try {

        const user = await UserService.getUser(socket.userId);
        const roomUsers = await UserService.getRoomUsers(socket.room);
        const messageToOther = new Message('service', user.name, 'joined');
        const messageToSocket = new Message('service', 'You', 'joined');

        socket.emit('messageChat', messageToSocket);
        socket.broadcast.to(socket.room).emit('messageChat', messageToOther);
        SocketIOService.emitId(socket.room, 'updateRoomUsers', roomUsers);

    } catch (err) {
        
        socket.emit('err', 'Error join to chat: ' + err.message);
    }
};
