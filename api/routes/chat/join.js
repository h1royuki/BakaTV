const io = require('../../socket');
const userNameGenerator = require('../../helpers/generators/userName');
const colorGenerator = require('../../helpers/generators/color');

module.exports = (room, socket) => {

    console.log(`Socket ${socket.id} connected to ${room}`);

    socket.room = room;
    socket.name = userNameGenerator();
    socket.color = colorGenerator();

    socket.join(room);

    socket.emit('join', socket.name);

    io.of('/chat').to(socket.room).emit('message', { type: 'service', user: socket.name, message: 'joined' });
};
