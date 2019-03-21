const ffmpeg = require('fluent-ffmpeg');
const { start, process, end } = require('./events');

class FFMpeg {

    start(url, id) {
        const stream = ffmpeg(url)
            .videoCodec('copy')
            .audioCodec('copy')
            .output('rtmp://localhost:1935/stream/' + id)
            .preset(this._preset);

        stream.run();
        return stream;
    }

    _preset(command) {
        command
            .addInputOption('-re')
            .toFormat('flv')
            .on('start', () => start())
            .on('progress', (progress) => process(progress))
            .on('end', () => end())
            .on('error', (error) => end(error));
    }

}

module.exports = new FFMpeg();