const io = require('../../socket');

module.exports = (socket) => {  
    
    io.to(socket.room).emit('chatMessage', { type: 'service', id: socket.id, name: socket.name, message: 'leave' });

    console.log(`Socket ${socket.id} disconnected`);
};