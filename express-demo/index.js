const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
];

app.get('/', (req, res) => {
    res.send('Inside Api!!');
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) res.status(404).send('Product for the given id is not available!');

    res.send(product);
});

app.post('/api/products', (req, res) => {
    const { error } = validatProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = {
        id: products.length + 1,
        name: req.body.name
    };
    products.push(product);
    res.send(product);
});

app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product cant be found!');

    const { error } = validatProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    product.name = req.body.name;
    res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product cant be found!');

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
});


function validatProduct(product) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(product, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));