const io = require('../../socket');

module.exports = (message, socket) => {
    io.to(socket.room).emit('chatMessage', { type: 'message', id: socket.id, name: socket.name, color: socket.color, message: message });
};