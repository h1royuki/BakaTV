
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
            id: this._id,
            props: this._props,
            stream: this._stream.streamLink
        }
    }

    getId() {
        return this._id;
    }
    getOwner() {
        return this.owner;
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