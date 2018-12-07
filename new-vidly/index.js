const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const { genres } = require('./routes/genres');
const { movies } = require('./routes/movies');
const { customers } = require('./routes/customer');
const { rentals } = require('./routes/rental');
const { users } = require('./routes/user');

const app = express();

mongoose.connect("mongodb://localhost/vidly", { useNewUrlParser: true })
    .then(() => console.log("Mongodb connected...."))
    .catch((err) => console.log('Db connection failed ', err));

    app.use(express.json());
    
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening to the port ${port}...`));