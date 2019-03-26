const chatJoin = require('./chatJoin');
const chatMessage = require('./chatMessage');
const disconnect = require('./disconnect');
const searchFilms = require('./searchFilms');
const roomJoin = require('./roomJoin');
const roomDestroy = require('./roomDestroy')
const streamStart = require('./streamStart');
const streamControl = require('./streamControl');

module.exports = (socket) => {
    socket.on('searchFilms', (query) => searchFilms(query, socket));
    socket.on('streamStart', (url) => streamStart(url, socket));
    socket.on('roomJoin', (room) => roomJoin(room, socket));
    socket.on('roomDestroy', () => roomDestroy(socket));
    socket.on('streamControl', (status) => streamControl(status, socket));
    socket.on('chatJoin', (room) => chatJoin(room, socket));
    socket.on('chatMessage', (msg) => chatMessage(msg, socket));
    socket.on('disconnect', () => disconnect(socket));
}