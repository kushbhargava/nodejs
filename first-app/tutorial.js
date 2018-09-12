//--------------------------------------------------
//one very first line write an error to see how node modularize files
//var cll=;

//--------------------------------------------------
//creating and using a module
const logger =  require('./logger');
//use const instead of var
logger('hey');

//--------------------------------------------------
// 1.Modules--
const path = require('path');

const os = require('os')

var pathOject = path.parse(__filename);

var tm = os.totalmem();

console.log(tm);

console.log(`total memory: ${tm}`);//ES6

console.log(pathOject);

//--------------------------------------------------
// 2.Files--
const fs = require('fs');
const files = fs.readdirSync('./');
//console.log(files);

fs.readdir('./', function (err, files) {
    if (err) {
        console.log(`Error : ${err}`);
        console.log('Error', err);
    } else {
        console.log(`results : ${files}`);
    }
});

//------------------------------------------------
//Events
const EventEmmiter = require('events');
const emitter = new EventEmmiter();

// Registering a listener
emitter.on('messageLogged',(arg) => {
    console.log('Listener called',arg);
});

//Raising the event
emitter.emit('messageLogged');

//Raising the event with argument, it will be handled by the same one
emitter.emit('messageLogged',{id:1 , url : 'https://'});

