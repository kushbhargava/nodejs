const express = require('express');

const { Genre, validateGenre } = require('../modals/genres');

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre
        .find()
        .sort({ 'name': 1 });
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.find({ '_id': req.params.id });
    if (!genre) return res.status(404).send('Genere not found!!');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {
        let genre = new Genre({ name: req.body.name });
        genre = await genre.save();

        res.send(genre);
    } catch (error) {
        return res.status(400).send(error.message);
    }
    //genres.push(genre);

});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('Genere with the given id cannot be found!!');

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const result = await Genre.findByIdAndRemove(req.params.id);
    res.send(result);
});

module.exports.genres = router;