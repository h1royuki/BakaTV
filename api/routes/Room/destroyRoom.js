const SocketIOService = require('../../services/SocketIOService');
const RoomService = require('../../services/RoomService');
const PlaylistService = require('../../services/PlaylistService');
const UserService = require('../../services/UserService');


module.exports = async (socket) => {
    try {

        await RoomService.removeRoom(socket.room);
        await PlaylistService.removePlaylist(socket.room);
        await UserService.removeUsers(socket.room);

        SocketIOService.emitId(socket.room, 'destroyRoom');
        SocketIOService.emitId(socket.room, 'notify', `Room destroyed by owner`);

        console.log(`Room ${socket.room} destroyed`)
    } catch (err) {
        console.log(err);
        socket.emit('err', `Error destroying room: ${err.message}`);
    }
}