const userNameGenerator = require('../../helpers/generators/userName');
const ChatService = require('../../services/ChatService');
const colorGenerator = require('../../helpers/generators/color');
const Message = require('../../models/Message');
const UserModel = require('../../models/User');
const SocketIOService = require('../../services/SocketIOService');


module.exports = (room, socket) => {

    try {
        console.log(`Socket ${socket.id} connected to ${room}`);

        const user = new UserModel(socket.id, userNameGenerator(), colorGenerator());

        ChatService.addUserToChat(user, room);

        const chatUsers = ChatService.getChatUsers(room);
        
        socket.emit('joinChat', { id: user.id, online_users: chatUsers });

        const message = new Message('service', user.id, user.name, 'joined');

        SocketIOService.emitId(room, 'messageChat', message.toJson());
        SocketIOService.emitId(room, 'updateChatUsers', chatUsers);
    } catch (err) {
        socket.emit('err', err.message);
    }
};
