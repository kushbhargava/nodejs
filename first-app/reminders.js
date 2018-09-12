//Global object -- in node we dont have windows object
global.console.log('hey');
//The variables are not directly added to the global object

//creating a module
//1.create a new js file(yay!! naya module ban gya)

//Using the module
//write inside the module you want to export -> module.export.<export-name> = <module-function-name> or export.<export-name> = <module-function-name> (see logger.js for ref)
//write inside the module where you want to import the module -> require('./<file-name>');

//ways to console log

var check = 'hey';
console.log('Hey ' + check);
console.log('Hey', check);
console.log(`Hey ${check}`);

//The original encapsulation of any module
(function (exports, require, module, __filename, __dirname) {
    //all these arguments are local to this function    
});

//Arrow function 
//This :-
emitter.on('messageLogged', function (arg) {
    console.log('Listener called', arg);
});
//will become this :-
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

//HTTP
//Part 1 - creating a connection
//Note :- server is an EventEmitter
const http = require('http');

const server = http.createServer();

server.on('connection', (socket) => {
    console.log('New connection');
});

server.listen(3000);

console.log('Listening on port 3000...');

//Part 2
//Creating a web-server for listening to http request
//CreateServer will have a callback function which will take two agrs - req,res.
//This approach is not that usefull but important to understand.
// We can create a server with the specifications of how it can handle request to various URLs
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello world!');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...');

