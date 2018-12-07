const express = require('express');

const { validateMovie, Movie } = require('../modals/movies');

const router = express.Router();


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

exports.movies = router;