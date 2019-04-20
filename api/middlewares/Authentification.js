const UserModel = require('../entity/Room/User');
const UserService = require('../services/UserService');
const userNameGenerator = require('../helpers/generators/userName');
const colorGenerator = require('../helpers/generators/color');
const crypto = require('crypto');

module.exports = async (socket) => {
    try {
        const data = socket.handshake.query;

        if (data.userId != 'null') {
            const user = await UserService.getUser(data.userId);

            if (data.userToken != 'null') {
                const token = await UserService.getUserToken(data.userId);

                if (data.userToken != token) {
                    throw new Error('Token is not valid!')
                }

                socket.userId = data.userId;
                user.socketId = socket.id;

                await UserService.updateUser(user);

            } else {
                throw new Error('Token not found');
            }
        } else {

            const token = crypto.randomBytes(20).toString('hex');
            const user = new UserModel(socket.id, userNameGenerator(), colorGenerator());
            await UserService.addUser(user, token);

            socket.userId = user.id;

            socket.emit('updateToken', { userId: user.id, userToken: token });
        }
        const user = await UserService.getUser(socket.userId);
        
        socket.emit('auth', {userId: user.id, userName: user.name});
    } catch (err) {
        socket.emit('err', `Auth error: ${err.message}`);
        socket.disconnect();
    }
}