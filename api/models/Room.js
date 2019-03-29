
const roomIdGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(ownerId, filmName) {
        this.id = roomIdGenerator();
        this.ownerId = ownerId;
        this.filmName = filmName;
        this.url;
        this.time = 0;
        this.status = 'play';
        this.timeouts = [];
    }

    toJson(id) {
        return {
            filmName: this.filmName,
            url: this.url,
            time: this.time,
            status: this.status,
            isOwner: this.ownerId == id ? true : false
        }
    }
}

module.exports = Room;