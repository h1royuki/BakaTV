
const UserService = require('../../services/UserService');

module.exports = async (socket) => {
    try {
        await UserService.deleteUserFromRoom(socket.userId, socket.room);

        socket.leave(socket.room);
        socket.room = null;

    } catch(err) { 
        socket.emit('err', 'Error leave from room: ' + err.message);
    }


}