const joinChat = require('./joinChat');
const messageChat = require('./messageChat');
const disconnect = require('./disconnect');
const searchFilms = require('./searchFilms');
const joinRoom = require('./joinRoom');
const destroyRoom = require('./destroyRoom')
const createRoom = require('./createRoom');
const getStreamState = require('./getStreamState');
const updateStreamState = require('./updateStreamState')

module.exports = (socket) => {
    socket.on('searchFilms', (query) => searchFilms(query, socket));
    socket.on('createRoom', (url) => createRoom(url, socket));
    socket.on('joinRoom', (room) => joinRoom(room, socket));
    socket.on('destroyRoom', () => destroyRoom(socket));
    socket.on('getStreamState', () => getStreamState(socket));
    socket.on('updateStreamState', (stream) => updateStreamState(stream, socket));
    socket.on('joinChat', (room) => joinChat(room, socket));
    socket.on('messageChat', (msg) => messageChat(msg, socket));
    socket.on('disconnect', () => disconnect(socket));
}