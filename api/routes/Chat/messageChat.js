const Message = require('../../models/Room/Chat/Message');
const UserService = require('../../services/UserService');
const MessageValidator = require('../../validators/MessageValidator');
const SocketIOService = require('../../services/SocketIOService');

module.exports = (message, socket) => {
    try {
        MessageValidator(message);
        
        const user = UserService.getUserFromRoom(socket.id, socket.room);

        const msg = new Message('message', user.id, user.name, message, user.color);

        SocketIOService.emitId(socket.room, 'messageChat', msg.toJson());
    } catch(err) {
        socket.emit('err', err.message);
    }
};