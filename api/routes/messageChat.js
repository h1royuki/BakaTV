const container = require('../modules/Container');
const Message = require('../models/Message');
const Validator = require('../validators/MessageValidator')

module.exports = (message, socket) => {
    try {
        Validator(message);
        const io = container.get('io');
        io.to(socket.room).emit('messageChat', new Message('message', socket.id, socket.name, message, socket.color).toJson());
    } catch(err) {
        socket.emit('err', err.message);
    }
};