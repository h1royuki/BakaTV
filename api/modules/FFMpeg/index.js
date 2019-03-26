const ffmpeg = require('fluent-ffmpeg');
const { start, progress, end } = require('./events');

class FFMpeg {

    start(room) {
        const stream = ffmpeg(room.stream.url)
            .seekInput(room.stream.pauseTime)
            .videoCodec('copy')
            .audioCodec('copy')
            .output(process.env.RTMP_URL + room.stream.id)
            .addInputOption('-re')
            .toFormat('flv')
            .on('start', () => start(room.id))
            .on('progress', (info) => progress(room.id, info))
            .on('end', () => end(room.id))
            .on('error', (error) => end(room.id, error));

        stream.run();
        return stream;
    }

}

module.exports = new FFMpeg();