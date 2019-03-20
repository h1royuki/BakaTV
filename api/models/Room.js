
const roomGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(owner, props, torrent) {
        this._owner = owner;
        this._props = props;
        this._torrent = torrent;
        this._streamId;
        this._stream;
        this._id = roomGenerator();
        this._status = 'start';
    }

    toJson() {
        return {
            props: this._props,
            streamId: this._streamId
        }
    }

    getId() {
        return this._id;
    }

    getTorrent() {
        return this._torrent;
    }
    
    getStreamId() {
        return this._streamId;
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

    setStream(stream) {
        this._stream = stream;
    }

    setStreamId(streamId) {
        this._streamId = streamId;
    }
}

module.exports = Room;