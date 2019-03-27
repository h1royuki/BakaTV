
const roomIdGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(ownerId, filmName) {
        this.id = roomIdGenerator();
        this.ownerId = ownerId;
        this.filmName = filmName;
        this.url;
    }

    toJson(id) {
        return {
            filmName: this.filmName,
            url: this.url,
            isOwner: this.ownerId == id ? true : false
        }
    }
}

module.exports = Room;