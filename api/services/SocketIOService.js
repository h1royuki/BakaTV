const io = require('../modules/io');

class SocketIOService {
    
    emitId(socketId, message, data = null) {
        io.to(socketId).emit(message, data);
    }



}

module.exports = new SocketIOService();