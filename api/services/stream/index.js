const ffmpeg = require('fluent-ffmpeg');
const URLFormatParser = require('../../helpers/URLFormatParser');
const stringGenerator = require('../../helpers/generators/randomString')
const { start, process, end, error } = require('./events');

class StreamService {

    constructor(url, room) {
        this.url = url;
        this.room = room;
        this.streamLink = stringGenerator();
        this.format = URLFormatParser(url);
        this.stream;
    }

    start() {
        if (this.stream) {
            new Error('Stream already started');
        }
        if (this.format == "mp4") {
            this.stream = this._streamMP4();
        } else {
            new Error('Invalid fromat');
        }

        this.stream.run();
        return this;
    }

    stop() {
        if (this.stream) {  
            this.stream.kill();
        } else {
            new Error('Stream not started');
        }
    }

    _streamMP4() {
        return this._preset()
            .videoCodec('copy')
            .audioCodec('copy')
    }

    _preset() {
        return ffmpeg(this.url)
            .inputOptions('-re')
            .toFormat('flv')
            .output('rtmp://localhost:1935/stream/' + this.streamLink)
            .on('start', () => start(this.room))
            .on('progress', (progress) => process(progress, this.room))
            .on('end', () => end(this.room))
            .on('error', () => error(this.room));
    }
    
}

module.exports = StreamService;