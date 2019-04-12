require('dotenv').config();
const io = require('./modules/io');
const routes = require('./routes');

io.on('connection', (socket) => {
    routes(socket);
});

module.exports = io;