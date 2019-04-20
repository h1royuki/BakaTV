const auth = require('./Authentification');
const isRoomExist = require('./isRoomExist');
const isRoomOwner = require('./isRoomOwner');

module.exports = async (socket, next) => {

    await auth(socket);

    socket.use((packet, next) => isRoomExist(socket, packet, next));
    socket.use((packet, next) => isRoomOwner(socket, packet, next));

    return next();
}