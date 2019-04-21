const Film = require('../entity/Room/Playlist/Film');
const PlaylistRepository = require('../repository/PlaylistRepository');
const RoomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');
const UserRepository = require('../repository/UserRepository');

class RoomService {

    async createRoom(roomId, creatorId, props) {
        try {
            const link = await KinogoParser.getMovieURL(props.url);

            const film = new Film(link, props.name, props.cover);

            await PlaylistRepository.addItemToPlaylist(roomId, film);
            await PlaylistRepository.setCurrentItemId(roomId, film.id);
            await UserRepository.addUserRoom(creatorId, roomId);
            await RoomRepository.setRoomOwner(roomId, creatorId);

            return await RoomRepository.setRoomCreator(roomId, creatorId);
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

    async getCreator(roomId) {
        return await RoomRepository.getRoomCreator(roomId);
    }

    async isRoomCreator(userId, roomId) {
        const creator = await this.getCreator(roomId);

        return userId == creator;
    }

    async isRoomExist(roomId) {
        return await RoomRepository.getRoomKeys(roomId);
    }

    async setRoomOwner(userId, roomId) {
        return await RoomRepository.setRoomOwner(roomId, userId);
    }

    async removeRoom(roomId) {
        return await RoomRepository.removeRoom(roomId);
    }
}

module.exports = new RoomService();