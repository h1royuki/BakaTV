require('dotenv').config();
const io = require('./modules/io');
const middlewares = require('./middlewares');
const routes = require('./routes');


io.use((socket, next) => middlewares(socket, next));

io.on('connection', (socket) => routes(socket));

module.exports = io;