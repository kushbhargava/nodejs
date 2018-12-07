const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 25,
        required: true
    },
    idGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(4).max(25).required(),
        idGold: Joi.boolean(),
        phone: Joi.string().min(5).max(20).required()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;

exports.validateCustomer = validateCustomer;