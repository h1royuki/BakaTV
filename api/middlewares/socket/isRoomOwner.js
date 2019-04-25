const RoomService = require('../../services/RoomService');

const ownerOps = ['addToPlaylist', 'getNextFilm', 'getPlaylist', 'removeFromPlaylist', 'setFilm', 'updateFilmStatus', 'updateFilmTime'];
const creatorOps = ['destroyRoom'];

module.exports = async (socket, packet, next) => {
    try {
        const userId = socket.userId;
        const ownerId = await RoomService.getOwner(socket.room);
        const creatorId = await RoomService.getCreator(socket.room);

        if (ownerOps.includes(packet[0])) {
            if (ownerId !== userId && creatorId !== userId) {
                throw new Error('You do not have privileges, b-baka!')
            }
        }

        if (creatorOps.includes(packet[0])) {
            if (creatorId != userId) {
                throw new Error('You not room creator');
            }
        }

        next();
    } catch (err) {
        socket.emit('err', err.message);
    }
}