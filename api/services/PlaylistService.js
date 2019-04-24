const FilmModel = require('../entity/Film');
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

    async addToPlaylist(roomId, items) {
        try {

            if (Object.keys(items).length == 0) {
                throw new Error('Nothing to add');
            }
            
            await Object.keys(items).map(async (key, index) => {

                const url = KinogoParser.getUrlFromFiles(items[key].files);
                const film = new FilmModel(url, items[key].name, items[key].cover, items[key].season, items[key].desc);
                await PlaylistRepository.addItemToPlaylist(roomId, film);
                await PlaylistRepository.setPlaylistLastId(roomId, film.id);
            })

        } catch (err) {
            throw new Error('Error add to playlist');
        }

    }

    async isCurrentItem(playlistId, itemId) {
        const current = await PlaylistRepository.getCurrentItemId(playlistId);
        return itemId == current;
    }

    async getNextOrPrevItemFromPlaylist(playlistId) {
        const currentId = await PlaylistRepository.getCurrentItemId(playlistId);
        const nextItems = await PlaylistRepository.getPlaylistItemsAfter(playlistId, currentId);

        if (nextItems[0]) {
            const nextItem = JSON.parse(nextItems[0]);

            await this.setFilm(playlistId, nextItem.id);
            return nextItem;
        }
        const prevItems = await PlaylistRepository.getPlaylistItemsBefore(playlistId, currentId);

        if (prevItems[prevItems.length - 1]) {
            const prevItem = JSON.parse(prevItems[prevItems.length - 1]);
            await this.setFilm(playlistId, prevItem.id);
            return prevItem;
        }
    }

    async removeItemFromPlaylist(playlistId, itemId) {
        return await PlaylistRepository.removeItemFromPlaylist(playlistId, itemId);
    }

    async getCurrentFilm(playlistId) {
        const currentId = await PlaylistRepository.getCurrentItemId(playlistId);
        const film = await PlaylistRepository.getItemFromPlaylist(playlistId, currentId);

        return film;
    }

    async startNextFilm(playlistId) {
        const current = await PlaylistRepository.getCurrentItemId(playlistId);

        const after = await PlaylistRepository.getPlaylistItemsAfter(playlistId, current);

        if (after[0]) {
            const newCurrent = JSON.parse(after[0]);
            await PlaylistRepository.setCurrentItemId(playlistId, newCurrent.id)
            return newCurrent;
        }
        throw new Error('Playlist ended');
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