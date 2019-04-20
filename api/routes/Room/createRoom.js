const RoomService = require('../../services/RoomService');
const stringGenerator = require('../../helpers/generators/randomString')

module.exports = async (film, socket) => {
        try {

                const roomId = stringGenerator();

                await RoomService.createRoom(roomId, socket.userId, film);
                socket.emit('createRoom', roomId);
                console.log(`Room ${roomId} created`);
        } catch (err) {             
                socket.emit('err', 'Error create room: ' + err.message);
        }
};