const io = require('../modules/io');

class SocketIOService {
    
    emitId(socketId, message, data = null) {
        io.to(socketId).emit(message, data);
    }

    getRoom(roomId) {
        return io.adapter.rooms[roomId];
    }
}

module.exports = new SocketIOService();