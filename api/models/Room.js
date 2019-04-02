
const roomIdGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(ownerId) {
        this.id = roomIdGenerator();
        this.ownerId = ownerId;
        this.users = {};
        this.timeouts = [];
        this.player;
    }

    toJson(user_id) {
        return {
            id: this.id,
            isOwner: this.ownerId == user_id ? true : false
        }
    }
}

module.exports = Room;