const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const customer = require('./routes/customer');

mongoose.connect('mongodb://localhost/customer', { useNewUrlParser: true })
    .then(() => console.log('connected to db'))
    .catch(err => console.error('Error ', err));
 
const app = express();
app.use(express.json());
app.use('/api/customers', customer);


app.listen(3000, () => {
    console.log('connected to port 3000...');
});
