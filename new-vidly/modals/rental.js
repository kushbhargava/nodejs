const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minLength: 5,
                maxLength: 255,
                required: true,
                trim: true,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateReturned: Date,
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validateRental = validateRental;