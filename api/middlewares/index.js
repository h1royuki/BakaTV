const auth = require('./io/Authentification');
const isRoomExist = require('./socket/isRoomExist');
const isRoomOwner = require('./socket/isRoomOwner');

module.exports = async (socket, next) => {

    await auth(socket);

    socket.use((packet, next) => isRoomExist(socket, packet, next));
    socket.use((packet, next) => isRoomOwner(socket, packet, next));

    return next();
}