module.exports = (roomId, socket) => {

    try {
        socket.room = roomId;
        socket.join(roomId);
    }
    catch(err) {
        socket.emit('err', 'Reconnect error: ' + err.message);
    }
}