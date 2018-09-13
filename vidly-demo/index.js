const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const genres = [
    { id: 1, name: 'Rock' },
    { id: 2, name: 'Classical' },
    { id: 3, name: 'Hip-hop' },
    { id: 4, name: 'EDM' },
];

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/generes', (req, res) => {
    res.send(genres);
});

app.get('/api/generes/:id', (req, res) => {
    const genere = genres.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('Genere not found!!');
    res.send(genere);
});

app.post('/api/generes', (req, res) => {
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/generes/:id', (req, res) => {

    const genere = genres.find(g => g.id === parseInt(req.params.id));
    if (!genere) return res.status(404).send('Not found!!!');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genere.name = req.body.name;
    res.send(genere);

});

app.delete('/api/generes/:id', (req, res) => {
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
};

app.listen(3000, () => console.log(`Listening to the port 3000...`));