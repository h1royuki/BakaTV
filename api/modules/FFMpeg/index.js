const ffmpeg = require('fluent-ffmpeg');
const { start, progress, end } = require('./events');

class FFMpeg {

    start(url, id, room) {
        const stream = ffmpeg(url)
            .videoCodec('copy')
            .audioCodec('copy')
            .output(process.env.RTMP_URL + id)
            .addInputOption('-re')
            .toFormat('flv')
            .on('start', () => start())
            .on('progress', (percents) => progress(room, percents))
            .on('end', () => end(room))
            .on('error', (error) => end(room, error));

        stream.run();
        return stream;
    }

}

module.exports = new FFMpeg();