const Message = require('../../entity/Room/Chat/Message');
const UserService = require('../../services/UserService');
const MessageValidator = require('../../validators/MessageValidator');

module.exports = async (message, socket) => {
    try {
        MessageValidator(message);
        
        const user = await UserService.getUser(socket.userId);

        const messageToOther = new Message('message', user.name, message, user.color);
        const messageToSocket = new Message('message', 'You', message, user.color);

        socket.emit('messageChat', messageToSocket);
        socket.broadcast.to(socket.room).emit('messageChat', messageToOther);
    } catch(err) {
        
        socket.emit('err', 'Error send message: ' + err.message);
    }
};