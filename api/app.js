require('dotenv').config();
const io = require('socket.io')();
const container = require('./modules/Container');
const routes = require('./routes');

container.set('io', io);

io.on('connection', (socket) => {
    routes(socket);
});

module.exports = io;