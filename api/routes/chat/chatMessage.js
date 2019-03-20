const container = require('../../modules/Container');

module.exports = (message, socket) => {
    const io = container.get('io');

    io.to(socket.room).emit('chatMessage', { type: 'message', id: socket.id, name: socket.name, color: socket.color, message: message });
};