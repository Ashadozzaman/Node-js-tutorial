const EventEmitter = require('events');

class School extends EventEmitter {
    test() {
        console.log('Test Function');
        this.emit('event', 'Hello World');
    }
}

module.exports = School;
