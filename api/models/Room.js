
const roomGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(ownerId, props) {
        this.id = roomGenerator();
        this.ownerId = ownerId;
        this.props = props;
        this.streamId;
        this.stream;
        this.status = 'start';
    }

    toJson(id) {
        return {
            props: this.props,
            streamId: this.streamId,
            owner: this.ownerId == id ? true : false
        }
    }
}

module.exports = Room;