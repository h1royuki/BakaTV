const userNameGenerator = require('../helpers/generators/userName');
const colorGenerator = require('../helpers/generators/color');
const Message = require('../models/Message');
const io = require('../modules/io');

module.exports = (room, socket) => {

    console.log(`Socket ${socket.id} connected to ${room}`);

    socket.name = userNameGenerator();
    socket.color = colorGenerator();
    socket.join(room);

    socket.emit('joinChat', socket.id);
    io.to(room).emit('messageChat', new Message('service', socket.id, socket.name, 'joined').toJson());
};
