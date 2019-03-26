const container = require('../modules/Container')
const NotFoundError = require('../errors/NotFoundError')


class RoomRepository {

    constructor() {
        this._rooms = [];
    }

    addRoom(room) {
        if (!(room.id in this._rooms)) {
            this._rooms[room.id] = room;
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
        if (room.id in this._rooms) {
            this._rooms[room.id] = room;
        } else {
            throw new NotFoundError('Room not found');
        }
    }

}

module.exports = new RoomRepository();