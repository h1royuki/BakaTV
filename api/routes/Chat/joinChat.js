const Message = require('../../entity/Room/Chat/Message');
const UserService = require('../../services/UserService');
const SocketIOService = require('../../services/SocketIOService');


module.exports = async (socket) => {

    try {

        const user = await UserService.getUserFromRoom(socket.userId, socket.room);
        const roomUsers = await UserService.getRoomUsers(socket.room);
        const message = new Message('service', user.id, user.name, 'joined');

        socket.emit('joinChat', roomUsers);
        SocketIOService.emitId(socket.room, 'messageChat', message);
        SocketIOService.emitId(socket.room, 'updateRoomUsers', roomUsers);
    } catch (err) {
        console.log(err);
        socket.emit('err', err.message);
    }
};
