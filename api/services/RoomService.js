const Stream = require('../models/Stream');
const FFMpeg = require('../modules/FFMpeg');
const roomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');

class RoomService {

    startStream(room, filmURL) {
        return KinogoParser.getMovieURL(filmURL).then((url) => {

            room.stream = new Stream(url);
            room.stream.ffmpeg = FFMpeg.start(room);
            console.log('ewqewqe');

            roomRepository.addRoom(room);
        }).catch((err) => {
            throw new Error('Error start stream');
        })
    }

    isRoomOwner(socketId, roomId) {
        const room = roomRepository.getRoom(roomId);

        return socketId == room.ownerId;
    }

    setRoomOwner(socketId, roomId) {
        const room = roomRepository.getRoom(roomId);
        room.ownerId = socketId;
        roomRepository.updateRoom(room);
    }

    setStreamStatus(roomId, status) {
        if (status == 'pause') {
            return this.pauseStream(roomId);
        }

        if(status == 'resume') {
            return this.resumeStream(roomId);
        }

        throw new Error('Invalid status');
    }

    destroyRoom(roomId) {
            const room = roomRepository.getRoom(roomId);

            room.status = 'destroy';
            roomRepository.updateRoom(room);
            
            room.stream.ffmpeg.kill();
    }

    pauseStream(roomId) {
        const room = roomRepository.getRoom(roomId);

        if (room.status == 'work') {
            room.status = "pause";
            room.stream.ffmpeg.kill();
            roomRepository.updateRoom(room);
            return room.status;
        }
        throw new Error('Room not streaming');
    }

    resumeStream(roomId) {
        const room = roomRepository.getRoom(roomId);

        if (room.status == 'pause') {
            room.status = "start";
            room.stream.ffmpeg = FFMpeg.start(room);
            roomRepository.updateRoom(room);
            return room.status;
        }
        throw new Error('Room not paused');
    }
}

module.exports = new RoomService();