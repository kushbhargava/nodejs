const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const {
    genreSchema,
    Genre
} = require('./genres');

const router = express.Router();

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

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    console.log(movies);
    res.send(movies)
});

router.post('/', async (req, res) => {
    const {
        error
    } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre Id');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });

    movie = await movie.save();
    res.send(movie);
});


function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
    };
    return Joi.validate(movie, schema);
}

module.exports = router;