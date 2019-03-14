const io = require('socket.io')();

io.rooms = [];

module.exports = io;