const container = require('../../modules/Container');
const Message = require('../../models/Message');

module.exports = (socket) => {

    const io = container.get('io');
    
    io.to(socket.room).emit('chatMessage', new Message('service', socket.id, socket.name, 'leave').toJson());

    console.log(`Socket ${socket.id} disconnected`);
};