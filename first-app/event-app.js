const EventEmitter = require('events');
const NewEvent = require('./new-event');

const newEmitter = new NewEvent;

newEmitter.on('myNewEvent',(args) => {
    console.log('Inside event',args);
});

newEmitter.log('Inside new-app.js');