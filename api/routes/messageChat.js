const Message = require('../models/Message');
const Validator = require('../validators/MessageValidator');
const io = require('../modules/io');

module.exports = (message, socket) => {
    try {
        Validator(message);
        io.to(socket.room).emit('messageChat', new Message('message', socket.id, socket.name, message, socket.color).toJson());
    } catch(err) {
        socket.emit('err', err.message);
    }
};