const Message = require('../../entity/Room/Chat/Message');
const UserService = require('../../services/UserService');
const MessageValidator = require('../../validators/MessageValidator');
const SocketIOService = require('../../services/SocketIOService');

module.exports = async (message, socket) => {
    try {
        MessageValidator(message);
        
        const user = await UserService.getUserFromRoom(socket.userId, socket.room);

        const msg = new Message('message', user.id, user.name, message, user.color);

        SocketIOService.emitId(socket.room, 'messageChat', msg);
    } catch(err) {
        console.log(err);
        socket.emit('err', err.message);
    }
};