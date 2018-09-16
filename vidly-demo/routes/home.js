const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hell World!!!' });
});

module.exports = router;