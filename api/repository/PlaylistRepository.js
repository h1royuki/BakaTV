const redis = require('../modules/redis');

class PlaylistRepository {

    async getCurrentItemId(playlistId) {
        return await redis.get(`playlist:${playlistId}:current`);
    }

    async setCurrentItemId(playlistId, itemId) {
        return await redis.set(`playlist:${playlistId}:current`, JSON.stringify(itemId));
    }

    async removeCurrentItemId(playlistId) {
        return await redis.del(`playlist:${playlistId}:current`);
    } 

    async getPlaylist(playlistId) {
        return await redis.zrange(`playlist:${playlistId}`, 0, -1);
    }

    async removePlaylist(playlistId) {
        return await redis.del(`playlist:${playlistId}`);
    }

    async addItemToPlaylist(playlistId, item) {
        return await redis.zadd(`playlist:${playlistId}`, item.id, JSON.stringify(item));
    }

    async getItemFromPlaylist(playlistId, itemId) {
        const item = await redis.zrangebyscore(`playlist:${playlistId}`, itemId, itemId);
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


}

module.exports = new PlaylistRepository();