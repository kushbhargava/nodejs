const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');

const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 25,
        required: true
    },
    idGold: Boolean,
    phone: Number
}));

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(400).
        res.send(customer);
});

module.exports = router;