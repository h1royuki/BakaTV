const joinChat = require('./Chat/joinChat');
const messageChat = require('./Chat/messageChat');

const searchFilms = require('./Search/searchFilms');

const joinRoom = require('./Room/joinRoom');
const destroyRoom = require('./Room/destroyRoom')
const createRoom = require('./Room/createRoom');

const getPlayerState = require('./Player/getPlayerState');
const updatePlayerStatus = require('./Player/updatePlayerStatus');
const updatePlayerTime = require('./Player/updatePlayerTime');

const disconnect = require('./disconnect');

module.exports = (socket) => {
    socket.on('searchFilms', (query) => searchFilms(query, socket));
    socket.on('createRoom', (url) => createRoom(url, socket));
    socket.on('joinRoom', (room) => joinRoom(room, socket));
    socket.on('destroyRoom', () => destroyRoom(socket));
    socket.on('getPlayerState', () => getPlayerState(socket));
    socket.on('updatePlayerStatus', (status) => updatePlayerStatus(status, socket));
    socket.on('updatePlayerTime', (time) => updatePlayerTime(time, socket));
    socket.on('joinChat', (room) => joinChat(room, socket));
    socket.on('messageChat', (msg) => messageChat(msg, socket));
    socket.on('disconnect', () => disconnect(socket));
}