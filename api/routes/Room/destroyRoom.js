const SocketIOService = require('../../services/SocketIOService');
const RoomService = require('../../services/RoomService');
const PlaylistService = require('../../services/PlaylistService');


module.exports = async (socket) => {
    try {

        await RoomService.removeRoom(socket.room);
        await PlaylistService.removePlaylist(socket.room);

        SocketIOService.emitId(socket.room, 'destroyRoom');
        SocketIOService.emitId(socket.room, 'notify', `Room destroyed by owner`);

        console.log(`Room ${socket.room} destroyed`)
    } catch (err) {
        
        socket.emit('err', `Error destroying room: ${err.message}`);
    }
}