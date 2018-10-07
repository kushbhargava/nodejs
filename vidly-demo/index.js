const express = require('express');//Used for creating rest api
const morgan = require('morgan'); //used for logging
const config = require('config'); // used for configuration
const authentication = require('./authentication'); //User defined middelware
const genres = require('./routes/genres'); //Refactoring of API
const home = require('./routes/home');
const mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
const app = express();

mongoose.connect("mongodb://localhost/vidly", { useNewUrlParser: true })
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("db connection failed!!!"));

console.log(`Server name : ${config.get('name')}`);
console.log(`Mail host : ${config.get('mail.host')}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); //Express middleware for json payload
app.use(express.urlencoded({ extended: true })); //External express middleware for urlencoded payload
app.use(express.static('public')); //External express middleware for static requests
app.use(authentication); //User defined middleware for authentication
app.use(function (req, res, next) { //User defined middleware for logger
    console.log('Logging!!!');
    next();
});

if (app.get('env') === 'development') {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' });//logging the request in a file

    app.use(morgan('tiny', { stream: accessLogStream }));
    console.log('Morgan running on development!!!');
}

app.use('/api/genres', genres); //Using the outsourced API
app.use('/', home);



const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening to the port ${port}...`));