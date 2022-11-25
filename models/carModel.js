const mongoose = require('mongoose');
const Joi = require('joi');

const carSchema = new mongoose.Schema({
    company: String,
    model: String,
    category: String,
    color: String,
    info: String,
    year: Number,
    price: Number,
    img_url: String,
    date_created: {
        type: Date, default: Date.now()
    },
    user_id: String
})
exports.CarModel = mongoose.model('cars', carSchema);

exports.validteCar = (reqBody) => {
    let joiSchma = Joi.object({
        company: Joi.string().min(2).max(150).required(),
        model: Joi.string().min(2).max(150).required(),
        category: Joi.string().min(2).max(150).required(),
        color: Joi.string().min(2).max(150).required(),
        info: Joi.string().min(2).max(1500).required(),
        year: Joi.number().min(0).max(9999).required(),
        price: Joi.number().min(0).max(99999999).required(),
        img_url: Joi.string().min(2).max(300).allow(null, "")
    })
    return joiSchma.validate(reqBody);
}