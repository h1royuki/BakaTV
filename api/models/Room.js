
const roomIdGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(ownerId, filmName) {
        this.id = roomIdGenerator();
        this.ownerId = ownerId;
        this.filmName = filmName;
        this.stream;
        this.status = 'start';
    }

    toJson(id) {
        return {
            filmName: this.filmName,
            streamId: this.stream.id,
            status: this.status,
            isOwner: this.ownerId == id ? true : false
        }
    }
}

module.exports = Room;