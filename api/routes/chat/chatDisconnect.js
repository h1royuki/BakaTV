const container = require('../../modules/Container');

module.exports = (socket) => {

    const io = container.get('io');
    
    io.to(socket.room).emit('chatMessage', { type: 'service', id: socket.id, name: socket.name, message: 'leave' });

    console.log(`Socket ${socket.id} disconnected`);
};