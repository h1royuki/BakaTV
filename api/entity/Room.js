const roomIdGenerator = require('../helpers/generators/randomString');

class Room {
    constructor() {
        this.id = roomIdGenerator();
        this.ownerId;
    }
}

module.exports = Room;