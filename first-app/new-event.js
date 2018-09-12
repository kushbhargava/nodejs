const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log('Inside Logger!', message);
        this.emit('myNewEvent', { id: 1 });
    }
}

module.exports = Logger;