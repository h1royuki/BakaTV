const userNameGenerator = require('../../helpers/generators/userName');
const UserService = require('../../services/UserService');
const colorGenerator = require('../../helpers/generators/color');
const Message = require('../../models/Room/Chat/Message');
const UserModel = require('../../models/Room/User');
const SocketIOService = require('../../services/SocketIOService');


module.exports = (socket) => {

    try {
        console.log(`Socket ${socket.id} connected to ${socket.room}`);

        const user = new UserModel(socket.id, userNameGenerator(), colorGenerator());

        UserService.addUserToRoom(user, socket.room);

        const roomUsers = UserService.getRoomUsers(socket.room);
        
        socket.emit('joinChat', roomUsers);

        const message = new Message('service', user.id, user.name, 'joined');

        SocketIOService.emitId(socket.room, 'messageChat', message.toJson());
        SocketIOService.emitId(socket.room, 'updateRoomUsers', roomUsers);
    } catch (err) {
        socket.emit('err', err.message);
    }
};
