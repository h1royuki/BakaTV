const Message = require('../models/Message');
const Validator = require('../validators/MessageValidator');
const SocketIOService = require('../services/SocketIOService');

module.exports = (message, socket) => {
    try {
        Validator(message);

        const msg = new Message('message', socket.id, socket.name, message, socket.color);

        SocketIOService.emitId(socket.room, 'messageChat', msg.toJson());
    } catch(err) {
        socket.emit('err', err.message);
    }
};