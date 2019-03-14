const io = require('../../socket');

module.exports = (socket) => {  
    
    io.of('/chat').to(socket.room).emit('message', { type: 'service', user: socket.name, message: 'leave' });

    console.log(`Socket ${socket.id} disconnected`);
};