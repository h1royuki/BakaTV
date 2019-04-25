const UserModel = require('../../entity/User');
const UserService = require('../../services/UserService');
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
                
                await UserService.updateSocketId(data.userId, socket.id);

            } else {
                throw new Error('Token not found');
            }
        } else {

            const id = Math.floor(Math.random() * 1000000);
            const token = crypto.randomBytes(20).toString('hex');
            const user = new UserModel();

            await UserService.addUser(user, id, token);
            await UserService.updateSocketId(id, socket.id);

            socket.userId = id;
            socket.emit('updateToken', { userId: id, userToken: token });
        }

        const user = await UserService.getUser(socket.userId);
        
        socket.emit('auth', {userId: socket.userId, userName: user.name});
    } catch (err) {
        socket.emit('err', `Auth error: ${err.message}`);
        socket.disconnect();
    }
}