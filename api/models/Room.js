
const roomGenerator = require('../helpers/generators/randomString');

class Room {
    constructor(owner, props) {
        this.id = roomGenerator();
        this.owner = owner;
        this.props = props;
        this.streamId;
        this.stream;
        this.status = 'start';
    }

    toJson() {
        return {
            props: this.props,
            streamId: this.streamId
        }
    }
}

module.exports = Room;