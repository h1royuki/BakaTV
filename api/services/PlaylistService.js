const FilmModel = require('../entity/Room/Playlist/Film');
const KinogoParser = require('../parsers/KinogoParser');
const PlaylistRepository = require('../repository/PlaylistRepository');

class PlaylistService {

    async getPlaylist(roomId) {
        let playlist = await PlaylistRepository.getPlaylist(roomId);
        const current = await PlaylistRepository.getCurrentItemId(roomId);

        const object = {};
        object.current = current;
        object.films = Object.assign({}, this.convertPlaylistItemsToObject(playlist));

        return object;
    }

    async addToPlaylist(roomId, film) {
        try {
            const url = await KinogoParser.getMovieURL(film.url);
            const newFilm = new FilmModel(url, film.name, film.cover);

            return await PlaylistRepository.addItemToPlaylist(roomId, newFilm);

        } catch (err) {
            console.log(err);
            throw new Error('Error add to playlist');
        }

    }

    async removeFromPlaylist(playlistId, itemId) {
        const currentId = await PlaylistRepository.getCurrentItemId(playlistId);

        if (currentId == itemId) {
            throw new Error('You can not delete active item');
        }

        return await PlaylistRepository.removeItemFromPlaylist(playlistId, itemId);
    }

    async getCurrentFilm(playlistId) {
        const currentId = await PlaylistRepository.getCurrentItemId(playlistId);
        const film = await PlaylistRepository.getItemFromPlaylist(playlistId, currentId);

        return film;
    }

    async startNextFilm(playlistId) {
        const current = await PlaylistRepository.getCurrentItemId(playlistId);

        if (current == itemId) {
            const after = await PlaylistRepository.getPlaylistItemsAfter(playlistIs, itemId);

            if (after[0]) {
                const newCurrent = JSON.parse(after[0]);
                await PlaylistRepository.setCurrentItemId(playlistId, newCurrent.id)
                return newCurrent;
            }

            throw new Error('Playlist ended');
        }

    }

    async setFilm(playlistId, itemId) {
        return await PlaylistRepository.setCurrentItemId(playlistId, itemId);
    }

    async updateCurrentStatus(playlistId, status) {
        const item = await this.getCurrentFilm(playlistId);
        item.status = status;
        return await PlaylistRepository.updateItemFromPlaylist(playlistId, item);
    }

    async updateCurrentTime(playlistId, time) {
        const item = await this.getCurrentFilm(playlistId);
        item.time = time;
        return await PlaylistRepository.updateItemFromPlaylist(playlistId, item);
    }

    async removePlaylist(playlistId) {
        await PlaylistRepository.removeCurrentItemId(playlistId);
        return await PlaylistRepository.removePlaylist(playlistId);
    }

    convertPlaylistItemsToObject(playlist) {
        for (let i = 0; i < playlist.length; i++) {
            playlist[i] = JSON.parse(playlist[i]);
        }
        return playlist;
    }

}

module.exports = new PlaylistService();