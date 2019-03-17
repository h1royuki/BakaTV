require('dotenv').config();
const io = require('./socket');
const { searchFilms, streamStart } = require('./routes/index');
const { chatJoin, chatMessage, chatDisconnect } = require('./routes/chat');
const {getRoomInfo, streamStop} = require('./routes/room');

io.on('connection', (socket) => {
    socket.emit('customEmi', '1123');
    socket.on('searchFilms', (query) => searchFilms(query, socket));
    socket.on('streamStart', (url) => streamStart(url, socket));
    
    socket.on('getRoomInfo', (room) => getRoomInfo(room, socket));
    socket.on('streamStop', (room) => streamStop(socket, room));

    socket.on('chatJoin', (room) => chatJoin(room, socket));
    socket.on('chatMessage', (msg) => chatMessage(msg, socket));
    socket.on('disconnect', () => chatDisconnect(socket));
});

module.exports = io;