require('dotenv').config();
const io = require('./socket');
const { join, message, disconnect } = require('./routes/chat');
const {get, search, start, stop} = require('./routes/stream');

const chat = io.of('/chat');


chat.on('connection', (socket) => {
    socket.on('join', (room) => join(room, socket));
    socket.on('message', (msg) => message(msg, socket));
    socket.on('disconnect', () => disconnect(socket));
});

io.on('connection', (socket) => {
    socket.on('get', (room) => get(room, socket));
    socket.on('search', (query) => search(query, socket));
    socket.on('start', (url) => start(url, socket));
    socket.on('stop', (room) => stop(socket, room));
    
});


module.exports = io;