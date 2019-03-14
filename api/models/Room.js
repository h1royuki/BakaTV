
const roomGenerator = require('../helpers/generators/randomString');

class Room {
    constructor() {
        this._id = roomGenerator();
        this._status = 'start';
        this._stream;
    }

    getId() {
        return this._id;
    }

    getStatus() {
        return this._status;
    }

    getStream() {
        return this._stream;
    }

    setStatus(status) {
        this._status = status;

        return this;
    }

    addStream(stream) {
        this._stream = stream;
    }
}

module.exports = Room;