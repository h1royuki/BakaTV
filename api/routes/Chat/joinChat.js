const userNameGenerator = require('../../helpers/generators/userName');
const UserService = require('../../services/UserService');
const colorGenerator = require('../../helpers/generators/color');
const Message = require('../../models/Message');
const UserModel = require('../../models/User');
const SocketIOService = require('../../services/SocketIOService');


module.exports = (room, socket) => {

    try {
        console.log(`Socket ${socket.id} connected to ${room}`);

        const user = new UserModel(socket.id, userNameGenerator(), colorGenerator());

        UserService.addUserToRoom(user, room);

        const roomUsers = UserService.getRoomUsers(room);
        
        socket.emit('joinChat', roomUsers);

        const message = new Message('service', user.id, user.name, 'joined');

        SocketIOService.emitId(room, 'messageChat', message.toJson());
        SocketIOService.emitId(room, 'updateRoomUsers', roomUsers);
    } catch (err) {
        socket.emit('err', err.message);
    }
};
