const mongoose = require('mongoose');
const Joi = require('joi'); //used for validation

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 25
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(4).required()
    };
    return Joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;

module.exports.Genre = Genre;

module.exports.validateGenre = validateGenre;