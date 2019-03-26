const container = require('../../Container');
const TimeConverter = require('../../../helpers/TimeConverter')
const RoomRepository = require('../../../repository/RoomRepository');

module.exports = (roomId, error) => {

    const io = container.get('io');
    const currentRoom = RoomRepository.getRoom(roomId);

    if (currentRoom.status == 'start' || currentRoom.status == 'work') {
        
        RoomRepository.removeRoom(roomId);

        io.to(currentRoom.id).emit('roomDestroy');
        io.to(currentRoom.ownerId).emit('err', `Stream crashed: ${error}`);
        
        console.log(`Stream on ${roomId} crashed: ${error}`);

    } else if (currentRoom.status == 'destroy') {
        RoomRepository.removeRoom(roomId);
        console.log(`Stream on ${roomId} destroyed`);
    } else {
        const progressTime = TimeConverter.TimeToDigit(currentRoom.stream.progressTime);
        const pauseTime = TimeConverter.TimeToDigit(currentRoom.stream.pauseTime);

        if (pauseTime > 0) {
            currentRoom.stream.pauseTime = TimeConverter.digitToTime(pauseTime + progressTime - 15); // 15s = 300 frames
        } else {
            currentRoom.stream.pauseTime = currentRoom.stream.progressTime;
        }

        RoomRepository.updateRoom(currentRoom);
    }

}