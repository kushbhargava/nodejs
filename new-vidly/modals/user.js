const mongoose = require('mongoose');
const Joi = require('joi');
const jwtToken = require('jsonwebtoken');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLenght: 5,
        maxLength: 50,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minLenght: 5,
        maxLength: 60,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLenght: 5,
        maxLength: 1024,
        required: true
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwtToken.sign({ _id: this._id }, 'jwtPrivateKey');
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(255).email({ minDomainAtoms: 2 }),
        password: Joi.string().required().min(5).max(255)
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;