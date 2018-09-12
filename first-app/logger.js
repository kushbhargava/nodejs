
const EventEmmiter = require('events');
var url = 'http://myLogger.io/log';

class Logger extends EventEmmiter {
    log(message) {

        console.log(message);

        this.emit('messageLogged', { id: 1, url: 'https://' });
    }
}



//module.exports.log = log; --Exporting object 
//Exporting Function
module.exports = Logger;

//Note :- exporting the object is usefull if we have 
//        multiple functions and variables. Otherwise we
//        directly export the required function only.
