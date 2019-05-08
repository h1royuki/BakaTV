const FilmModel = require("../entity/Film");
const PlaylistRepository = require("../repository/PlaylistRepository");

class PlaylistService {
  async getPlaylist(roomId) {
    const playlist = await PlaylistRepository.getPlaylist(roomId);
    const current = await PlaylistRepository.getCurrentItem(roomId);

    const object = {};
    object.current = current;
    object.films = Object.assign(
      {},
      this.convertPlaylistItemsToObject(playlist)
    );

    return object;
  }

  async addToPlaylist(roomId, items) {
    try {
      if (Object.keys(items).length == 0) {
        throw new Error("Nothing to add");
      }

      let lastPlaylistId = await PlaylistRepository.getPlaylistLastId(roomId);

      await Object.keys(items).map(async key => {
        const film = new FilmModel(
          lastPlaylistId++,
          items[key].url,
          items[key].name,
          items[key].cover,
          items[key].season,
          items[key].desc
        );

        await PlaylistRepository.addItemToPlaylist(roomId, film);
        await PlaylistRepository.setPlaylistLastId(roomId, film.id);

        lastPlaylistId = lastPlaylistId++;
      });

      await PlaylistRepository.setPlaylistLastId(roomId, lastPlaylistId);
    } catch (err) {
      throw new Error("Error add to playlist");
    }
  }

  async isCurrentItem(playlistId, itemId) {
    const currentItem = await PlaylistRepository.getCurrentItem(playlistId);
    return itemId == currentItem.id;
  }

  async getNextOrPrevItemFromPlaylist(playlistId) {
    const current = await PlaylistRepository.getCurrentItem(playlistId);
    const nextItems = await PlaylistRepository.getPlaylistItemsAfter(
      playlistId,
      current.id
    );

    if (nextItems[0]) {
      const nextItem = JSON.parse(nextItems[0]);

      await this.setFilm(playlistId, nextItem.id);
      return nextItem;
    }
    const prevItems = await PlaylistRepository.getPlaylistItemsBefore(
      playlistId,
      current.id
    );

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
    return await PlaylistRepository.getCurrentItem(playlistId);
  }

  async startNextFilm(playlistId) {
    const currentItem = await PlaylistRepository.getCurrentItem(playlistId);

    // get items after current item in playlist
    const after = await PlaylistRepository.getPlaylistItemsAfter(
      playlistId,
      currentItem.id
    );

    if (after[0]) {
      const newCurrent = JSON.parse(after[0]);
      await PlaylistRepository.setCurrentItem(playlistId, newCurrent);
      await PlaylistRepository.removeItemFromPlaylist(
        playlistId,
        newCurrent.id
      ); // remove new active item from playlist
      return newCurrent;
    }
    throw new Error("Playlist ended");
  }

  async setFilm(playlistId, itemId) {
    const currentItem = await PlaylistRepository.getCurrentItem(playlistId);
    const newItem = await PlaylistRepository.getItemFromPlaylist(
      playlistId,
      itemId
    );

    await PlaylistRepository.setCurrentItem(playlistId, newItem);
    await PlaylistRepository.addItemToPlaylist(playlistId, currentItem);
    await PlaylistRepository.removeItemFromPlaylist(playlistId, newItem.id);
  }

  async updateCurrentStatus(playlistId, status) {
    const currentItem = await PlaylistRepository.getCurrentItem(playlistId);
    currentItem.status = status;
    return await PlaylistRepository.setCurrentItem(playlistId, currentItem);
  }

  async updateCurrentTime(playlistId, time) {
    const currentItem = await PlaylistRepository.getCurrentItem(playlistId);
    currentItem.time = time;
    return await PlaylistRepository.setCurrentItem(playlistId, currentItem);
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
