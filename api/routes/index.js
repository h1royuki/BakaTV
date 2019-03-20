const { searchFilms, streamStart } = require('./index/');
const { chatJoin, chatMessage, chatDisconnect } = require('./chat/');
const { getRoomInfo, streamStop } = require('./room/');

module.exports = (socket) => {
    socket.on('searchFilms', (query) => searchFilms(query, socket));
    socket.on('streamStart', (url) => streamStart(url, socket));

    socket.on('getRoomInfo', (room) => getRoomInfo(room, socket));
    socket.on('streamStop', (room) => streamStop(room,socket));

    socket.on('chatJoin', (room) => chatJoin(room, socket));
    socket.on('chatMessage', (msg) => chatMessage(msg, socket));
    socket.on('disconnect', () => chatDisconnect(socket));
}