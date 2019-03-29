const io = require('../modules/io');

class SocketIOService {

    getRoomSockets(roomId) {
        return io.sockets.adapter.rooms[roomId];
    }

    getFirstSocketOfRoom(roomId) {
        const clients = this.getRoomSockets(roomId);
        return Object.keys(clients.sockets)[0];
    }

    emitId(socketId, message, data = null) {
        io.to(socketId).emit(message, data);
    }



}

module.exports = new SocketIOService();