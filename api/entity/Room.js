const roomIdGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(ownerId) {
        this.id = roomIdGenerator();
        this.ownerId = ownerId;
    }
}

module.exports = Room;