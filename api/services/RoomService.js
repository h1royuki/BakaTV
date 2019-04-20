const Film = require('../entity/Room/Playlist/Film');
const PlaylistRepository = require('../repository/PlaylistRepository');
const RoomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');

class RoomService {

    async createRoom(roomId, ownerId, props) {
        try {
            const link = await KinogoParser.getMovieURL(props.url);
            
            const film = new Film(link, props.name, props.cover);

            await PlaylistRepository.addItemToPlaylist(roomId, film);
            await PlaylistRepository.setCurrentItemId(roomId, film.id);

            return await RoomRepository.setRoomOwner(roomId, ownerId);
        } catch (err) {
            throw new Error('Error create room');
        }
    }

    async getOwner(roomId) {
        return await RoomRepository.getRoomOwner(roomId);
    }

    async isRoomOwner(userId, roomId) {
        const owner = await this.getOwner(roomId);

        return userId == owner;
    }

    async isRoomExist(roomId) {
        return await RoomRepository.getRoomKeys(roomId);
    }

    async setRoomOwner(userId, roomId) {
        return await RoomRepository.setRoomOwner(roomId, userId);
    }

    async removeRoom(roomId) {
        await RoomRepository.removeRoomOwner(roomId);
        return await RoomRepository.removeRoomUsers(roomId);
    }
}

module.exports = new RoomService();