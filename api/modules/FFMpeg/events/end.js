const container = require('../../Container');
const TorrentService = require('../../../services/TorrentService');
const roomsRepository = require('../../../repository/RoomRepository');

module.exports = (error) => {

    const io = container.get('io');
    const room = roomsRepository.getCurrentRoom();
    const stream = room.getTorrent();

    TorrentService.removeTorrent(stream);   
    roomsRepository.removeRoom(room.getId());

    console.log(error);
    if(room.getStatus() == 'start') {
        room.getOwner().emit('err', 'Stream crashed: ' + error);
        console.log(`Stream on ${room.getId()} crashed: ` + error);
    } else {
        console.log(`Stream on ${room.getId()} ended`);
        io.to(room.getId()).emit('streamStop');
        io.to(room.getId()).emit('err', 'Stream stopped');
    }
}