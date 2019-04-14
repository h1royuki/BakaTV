const joinChat = require('./Chat/joinChat');
const messageChat = require('./Chat/messageChat');
const searchFilms = require('./Search/searchFilms');
const joinRoom = require('./Room/joinRoom');
const destroyRoom = require('./Room/destroyRoom')
const createRoom = require('./Room/createRoom');
const addToPlaylist = require('./Playlist/addToPlaylist');
const removeFromPlaylist = require('./Playlist/removeFromPlaylist');
const setFilm = require('./Playlist/setFilm');
const getNextFilm = require('./Playlist/getNextFilm');
const getPlaylist = require('./Playlist/getPlaylist');
const getFilm = require('./Playlist/getFilm');
const updateFilmStatus = require('./Playlist/updateFilmStatus');
const updateFilmTime = require('./Playlist/updateFilmTime');
const disconnect = require('./disconnect');

const middlewares = require('../middlewares');

module.exports = (socket) => {

    middlewares.forEach(middleware => {
        socket.use((packet, next) => middleware(socket, packet, next));
    });

    socket.on('searchFilms', (query) => searchFilms(query, socket));
    socket.on('createRoom', (url) => createRoom(url, socket));
    socket.on('joinRoom', (room) => joinRoom(room, socket));
    socket.on('destroyRoom', () => destroyRoom(socket));
    socket.on('getFilm', () => getFilm(socket));
    socket.on('addToPlaylist', (film) => addToPlaylist(film, socket));
    socket.on('removeFromPlaylist', (id) => removeFromPlaylist(id, socket));
    socket.on('setFilm', (id) => setFilm(id, socket));
    socket.on('getPlaylist', () => getPlaylist(socket));
    socket.on('getNextFilm', () => getNextFilm(socket));
    socket.on('updateFilmStatus', (status) => updateFilmStatus(status, socket));
    socket.on('updateFilmTime', (time) => updateFilmTime(time, socket));
    socket.on('joinChat', () => joinChat(socket));
    socket.on('messageChat', (msg) => messageChat(msg, socket));
    socket.on('disconnect', () => disconnect(socket));
}