const container = require('../../../modules/Container');

module.exports = () => {
    const room = container.get('room');  
      
    console.log(`Stream on ${room} started`);
}   