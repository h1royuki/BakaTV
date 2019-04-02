const Message = require('../../models/Message');
const ChatService = require('../../services/ChatService');
const Validator = require('../../validators/MessageValidator');
const SocketIOService = require('../../services/SocketIOService');

module.exports = (message, socket) => {
    try {
        Validator(message);

        
        const user = ChatService.getUserFromChat(socket.id, socket.room);

        const msg = new Message('message', user.id, user.name, message, user.color);

        SocketIOService.emitId(socket.room, 'messageChat', msg.toJson());
    } catch(err) {
        socket.emit('err', err.message);
    }
};