const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();

const { User } = require('../modals/user');


router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });

    if (user)
        return res.status(400).send('User is already registered!');


    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    //generating salt which will work as an encryption key.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const jwtToken = user.generateAuthToken();
    res.header('x-auth-token', jwtToken).send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

function validate(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(255).email({ minDomainAtoms: 2 }),
        password: Joi.string().required().min(5).max(255)
    };
    return Joi.validate(user, schema);

}

module.exports.auth = router;