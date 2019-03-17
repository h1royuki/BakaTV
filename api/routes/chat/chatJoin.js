const io = require('../../socket');
const userNameGenerator = require('../../helpers/generators/userName');
const colorGenerator = require('../../helpers/generators/color');

module.exports = (room, socket) => {

    console.log(`Socket ${socket.id} connected to ${room}`);

    socket.name = userNameGenerator();
    socket.color = colorGenerator();
    socket.room = room;

    socket.join(room);

    socket.emit('chatJoin', socket.id);

    io.to(room).emit('chatMessage', { type: 'service', id: socket.id, name: socket.name, message: 'joined' });
};
