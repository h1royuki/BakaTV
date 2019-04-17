const Film = require('../entity/Room/Playlist/Film');
const PlaylistRepository = require('../repository/PlaylistRepository');
const RoomRepository = require('../repository/RoomRepository');
const KinogoParser = require('../parsers/KinogoParser');

class RoomService {

    async createRoom(room, props) {
        try {
            const link = await KinogoParser.getMovieURL(props.url);
            
            const film = new Film(link, props.name, props.cover);

            await PlaylistRepository.addItemToPlaylist(room.id, film);
            await PlaylistRepository.setCurrentItemId(room.id, film.id);

            return await RoomRepository.addRoom(room);
        } catch (err) {
            console.log(err);
            throw new Error('Error create room');
        }
    }

    async getRoom(roomId) {
        return await RoomRepository.getRoom(roomId);
    }

    async getOwner(roomId) {
        const room = await this.getRoom(roomId);

        return room.ownerId;
    }

    async isRoomOwner(userId, roomId) {
        const room = await this.getRoom(roomId);

        return userId == room.ownerId;
    }

    async setRoomOwner(userId, roomId) {
        const room = await this.getRoom(roomId);

        room.ownerId = userId;
        
        return await RoomRepository.updateRoom(room);
    }

    async removeRoom(roomId) {
        return await RoomRepository.deleteRoom(roomId);
    }
}

module.exports = new RoomService();