module.exports = (roomId, socket) => {
    socket.room = roomId;
    socket.join(roomId);
}