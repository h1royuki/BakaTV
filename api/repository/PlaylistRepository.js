const redis = require('../modules/redis');

class PlaylistRepository {

    async getCurrentItemId(playlistId) {
        return await redis.get(`playlist:${playlistId}:current`);
    }

    async setCurrentItemId(playlistId, itemId) {
        return await redis.set(`playlist:${playlistId}:current`, itemId);
    }

    async getPlaylist(playlistId) {
        const playlist = await redis.zrange(`playlist:${playlistId}`, 0, -1);

        if (!playlist) {
            throw new Error('Playlist not found');
        }
        return playlist;
    }

    async getPlaylistLastId(playlistId) {
        return parseInt(await redis.get(`playlist:${playlistId}:lastid`));
    }

    async setPlaylistLastId(playlistId, id) {
        console.log(id);
        return await redis.set(`playlist:${playlistId}:lastid`, id);
    }

    async addItemToPlaylist(playlistId, item) {
        return await redis.zadd(`playlist:${playlistId}`, item.id, JSON.stringify(item));
    }

    async getItemFromPlaylist(playlistId, itemId) {
        const item = await redis.zrangebyscore(`playlist:${playlistId}`, itemId, itemId);

        if (!item) {
            throw new Error('Item not found');
        }
        return JSON.parse(item);
    }

    async getPlaylistItemsBefore(playlistId, itemId) {
        return await redis.zrangebyscore(`playlist:${playlistId}`, `-inf`, `(${itemId}`);
    }

    async getPlaylistItemsAfter(playlistId, itemId) {
        return await redis.zrangebyscore(`playlist:${playlistId}`, `(${itemId}`, `+inf`);
    }

    async removeItemFromPlaylist(playlistId, itemId) {
        return await redis.zremrangebyscore(`playlist:${playlistId}`, itemId, itemId);
    }

    async updateItemFromPlaylist(playlistId, item) {
        await this.removeItemFromPlaylist(playlistId, item.id);
        return await this.addItemToPlaylist(playlistId, item);
    }

    async getPlaylistKeys(playlistId) {
        return await redis.keys(`playlist:${playlistId}*`);
    }

    async removePlaylist(playlistId) {
        const keys = await this.getPlaylistKeys(playlistId);

        for (let i = 0; i < keys.length; i++) {
            await redis.del(keys[i]);
        }
    }
}

module.exports = new PlaylistRepository();