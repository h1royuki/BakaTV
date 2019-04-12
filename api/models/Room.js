
const roomIdGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(ownerId) {
        this.id = roomIdGenerator();
        this.ownerId = ownerId;
        this.users = {};
        this.timeouts = [];
        this.playlist;
    }

    toJson(user_id) {
        return {
            id: this.id,
            owner: this.ownerId
        }
    }
}

module.exports = Room;