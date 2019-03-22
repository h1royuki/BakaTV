const FFMpeg = require('../modules/FFMpeg')
const URLFormatParser = require('../helpers/URLFormatParser');
const stringGenerator = require('../helpers/generators/randomString')

class StreamService {

    constructor(path) {
        this._path = path;
        this._streamId = stringGenerator();
    }

    start(room) {
        return FFMpeg.start(this._path, this._streamId, room);
    }

    stop(stream) {
        if (stream) {
            stream.kill();
        }
        throw new Error('Stream not found');
    }

    getStreamId() {
        if (this._streamId) {
            return this._streamId;
        }
        throw new Error('Stream ID not found');
    }
}

module.exports = StreamService;