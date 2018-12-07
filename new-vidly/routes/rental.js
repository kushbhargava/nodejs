const express = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');

const { Rental, validateRental } = require('../modals/rental');
const { Movie } = require('../modals/movies');
const { Customer } = require('../modals/customer');

Fawn.init(mongoose);

const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals)
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('Coudnt find rental for id', req.params.id);

    res.send(rental)
});

router.post('/', async (req, res) => {
    const {
        error
    } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
    //     return res.status(400).send('Invalid customer Id');
    // if (!mongoose.Types.ObjectId.isValid(req.body.movieId))
    //     return res.status(400).send('Invalid movieId');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer Id');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie Id');

    if (movie.numberInStock > 0) {

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate,
            }
        });
        try {
            new Fawn.Task()
                .save('rentals', rental)
                .update('movies', { _id: movie._id }, {
                    $inc: { numberInStock: -1 }
                })
                .run();
            res.send(rental);
        } catch (error) {
            console.log('update failed');
            res.status(500).send('Error', error);
        }
    } else {
        return res.status(500).send('Movie is unavailable!!');
    }
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer Id');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie Id');

    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('Coudnt find rental for id', req.params.id);

    if (movie.numberInStock > 0) {

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate,
            }
        });
        try {
            new Fawn.Task()
                .save('rentals', rental)
                .update('movies', { _id: movie._id }, {
                    $inc: { numberInStock: -1 }
                })
                .run();
            res.send(rental);
        } catch (error) {
            console.log('update failed');
            res.status(500).send('Error', error);
        }
    } else {
        return res.status(500).send('Movie is unavailable!!');
    }
});

exports.rentals = router;