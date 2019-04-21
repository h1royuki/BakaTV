const UserService = require('../../services/UserService');

module.exports = async (socket) => {
    try {
        const rooms = await UserService.getUserRooms(socket.userId);

        socket.emit('updateUserRooms', rooms);

    } catch(err) {
        socket.emit('err', 'Error get rooms: ' + err.message);
    }
}