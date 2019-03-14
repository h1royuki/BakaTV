const io = require('../../socket');

module.exports = (message, socket) => {
    io.of('/chat').to(socket.room).emit('message', { type: 'message', user: socket.name, color: socket.color, message: message });
};