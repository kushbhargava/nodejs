const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Classical' },
    { id: 3, name: 'Hip-hop' },
    { id: 4, name: 'EDM' },
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genere = genres.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('Genere not found!!');
    res.send(genere);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {

    const genere = genres.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('Not found!!!');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genere.name = req.body.name;
    res.send(genere);

});

router.delete('/:id', (req, res) => {
    const genere = genres.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('Not found!!!');

    const index = genres.indexOf(genere);
    genres.splice(index, 1);

    res.send(genere);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;