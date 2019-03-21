const ffmpeg = require('fluent-ffmpeg');
const { start, progress, end } = require('./events');

class FFMpeg {

    start(url, id) {
        const stream = ffmpeg(url)
            .videoCodec('copy')
            .audioCodec('copy')
            .output(process.env.RTMP_URL + id)
            .preset(this._preset);

        stream.run();
        return stream;
    }

    _preset(command) {
        command
            .addInputOption('-re')
            .toFormat('flv')
            .on('start', () => start())
            .on('progress', (percents) => progress(percents))
            .on('end', () => end())
            .on('error', (error) => end(error));
    }

}

module.exports = new FFMpeg();