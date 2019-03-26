const streamIdGenerator = require('../helpers/generators/randomString');

class Stream {

    constructor(url) {
        this.id = streamIdGenerator();
        this.url = url;
        this.progressTime = '00:00:00';
        this.pauseTime = '00:00:00';
        this.ffmpeg;
    }
}

module.exports = Stream;