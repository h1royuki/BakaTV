const userNameGenerator = require('../../helpers/generators/userName');
const UserService = require('../../services/UserService');
const colorGenerator = require('../../helpers/generators/color');
const UserModel = require('../../entity/Room/User');
const RoomService = require('../../services/RoomService');

module.exports = async (id, socket) => {
    try {

        socket.room = id;
        socket.join(id);

        if (!socket.userId) {
            socket.userId = Date.now();
        }

        if (!await RoomService.getOwner(id)) {
            console.log('owner not found');
            await RoomService.setRoomOwner(socket.userId, id);
        }

        const user = new UserModel(socket.userId, socket.id, userNameGenerator(), colorGenerator());
        const room = await RoomService.getRoom(id);

        await UserService.addUserToRoom(user, socket.room);

        socket.emit('joinRoom', { userId: socket.userId, room: room });
    } catch (err) {
        console.log(err);
        socket.emit('err', err.message);
    }
};      