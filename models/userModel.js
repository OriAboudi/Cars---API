const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String, default: "user"
    },
    date_created: {
        type: Date, default: Date.now()
    }
})
exports.userModel = mongoose.model('users', userSchema);

exports.creatToken = (userId) => {
    let token = jwt.sign({ _id: userId }, `${config.tokenSecret}`, { expiresIn: "60mins" })
    return token;
}
exports.validteUser = (reqBody) => {
    let joiSchma = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        email: Joi.string().min(2).max(150).required(),
        password: Joi.string().min(2).max(150).required(),
    })
    return joiSchma.validate(reqBody);
}
exports.validteLogin = (reqBody) => {
    let joiSchma = Joi.object({
        email: Joi.string().min(2).max(150).required(),
        password: Joi.string().min(2).max(150).required(),
    })
    return joiSchma.validate(reqBody);
}