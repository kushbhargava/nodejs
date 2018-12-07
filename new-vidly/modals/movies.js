const mongoose = require('mongoose');
const Joi = require('joi');
require('./genres');

const {
    genreSchema
} = require('./genres');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true,
        trim: true,
    },
    genre: {
        type: genreSchema,
        ref: 'Genre',
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movies', movieSchema);


function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
exports.movieSchema = movieSchema;