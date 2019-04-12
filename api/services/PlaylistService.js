const FilmModel = require('../models/Room/Playlist/Film');
const KinogoParser = require('../parsers/KinogoParser');
const roomRepository = require('../repository/RoomRepository');

class PlaylistService {

    getPlaylist(roomId) {
        const room = roomRepository.getRoom(roomId);

        const playlist = {};
        playlist.current = room.playlist.current;
        playlist.films = Object.assign({}, room.playlist.films);
        
        return playlist;
    }

    addToPlaylist(roomId, film) {
        return KinogoParser.getMovieURL(film.url).then((url) => {
            const newFilm = new FilmModel(url, film.name);
            const room = roomRepository.getRoom(roomId);

            room.playlist.films.push(newFilm);

            roomRepository.updateRoom(room);
        }).catch((err) => {
            throw new Error('Error add to playlist');
        });
    }

    removeFromPlaylist(roomId, id) {
        const room = roomRepository.getRoom(roomId);

        delete room.playlist.films[id];
        room.playlist.films = room.playlist.films.filter(val => val);

        roomRepository.updateRoom(room);
    }

    getCurrentFilmInfo(roomId) {
        const room = roomRepository.getRoom(roomId);
        const current = room.playlist.current;

        return room.playlist.films[current];
    }

    startNextFilm(roomId) {
        const room = roomRepository.getRoom(roomId);
        const current = room.playlist.current;

        room.playlist.films[current].status = 'ended';
        room.playlist.films[current].time = '0';

        if(room.playlist.films[current + 1]) {
            room.playlist.current = current + 1;            
            roomRepository.updateRoom(room);
        } else {
            throw new Error('Playlist ended');
        }

    }

    updatePlaylist(films) {
        const room = roomRepository.getRoom(roomId);

        room.playlist.films = films;

        roomRepository.updateRoom(room);
    }

    setCurrentFilm(id, roomId) {
        const room = roomRepository.getRoom(roomId);

        room.playlist.films[id].status = 'play';
        room.playlist.current = id;

        roomRepository.updateRoom(room);
    }

    updateCurrentStatus(roomId, status) {
        const room = roomRepository.getRoom(roomId);
        const current = room.playlist.current;

        room.playlist.films[current].status = status;

        roomRepository.updateRoom(room);
    }

    updateCurrentTime(roomId, time) {
        const room = roomRepository.getRoom(roomId);
        const current = room.playlist.current;

        room.playlist.films[current].time = time;

        roomRepository.updateRoom(room);
    }

}

module.exports = new PlaylistService();