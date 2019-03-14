const NotFoundError = require('../errors/NotFoundError')


class RoomService {

    constructor() {
        this._rooms = [];
    }

    addRoom(room) {
        if (!(room.getId() in this._rooms)) {
            this._rooms[room.getId()] = room;
        } else {
            throw new Error('Room already created');
        }
    }

    removeRoom(id) {
        if (id in this._rooms) {
            delete this._rooms[id];
        } else {
            throw new Error('Room not created');
        }
    }

    getRoom(id) {
        if (id in this._rooms) {
            return this._rooms[id];
        }
        throw new NotFoundError('Room not found');
    }

    updateRoom(room) {
        if (room.getId() in this._rooms) {
            this._rooms[room.getId()] = room;
        } else {
            throw new NotFoundError('Room not found');
        }
    }

}

module.exports = new RoomService();