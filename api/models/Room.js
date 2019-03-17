
const roomGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(owner, props) {
        this._owner = owner;
        this._props = props;
        this._id = roomGenerator();
        this._status = 'start';
        this._stream;
    }

    toJson() {
        return {
            props: this._props,
            stream: this._stream.streamLink
        }
    }

    getId() {
        return this._id;
    }

    getOwner() {
        return this._owner;
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

    setOwner(id) {
        this._owner = id;
    }

    addStream(stream) {
        this._stream = stream;
    }
}

module.exports = Room;