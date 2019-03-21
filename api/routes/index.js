const chatJoin = require('./chatJoin');
const chatMessage = require('./chatMessage');
const disconnect = require('./disconnect');
const searchFilms = require('./searchFilms');
const streamStart = require('./streamStart');
const getRoomInfo = require('./getRoomInfo');
const streamStop = require('./streamStop');

module.exports = (socket) => {
    socket.on('searchFilms', (query) => searchFilms(query, socket));
    socket.on('streamStart', (url) => streamStart(url, socket));
    socket.on('getRoomInfo', () => getRoomInfo(socket));
    socket.on('streamStop', () => streamStop(socket));
    socket.on('chatJoin', (room) => chatJoin(room, socket));
    socket.on('chatMessage', (msg) => chatMessage(msg, socket));
    socket.on('disconnect', () => disconnect(socket));
}