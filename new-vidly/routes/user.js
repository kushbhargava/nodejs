const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

const { User, validate } = require('../modals/user');


router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('User is already registered!');


    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    //generating salt which will work as an encryption key.
    
    
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

exports.users = router;