const mongoose = require('mongoose');
const Joi = require('joi');

const foodsSchema = new mongoose.Schema({
    name: String,
    cals: Number,
    price: Number,
    img_url: String

})
exports.FoodsModel = mongoose.model('foods', foodsSchema);

exports.validteFood = (reqBody) => {
    let joiSchma = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        cals: Joi.number().min(0).max(9999).required(),
        price: Joi.number().min(0).max(9999).required(),
        img_url: Joi.string().min(2).max(300).allow(null, "")
    })
    return joiSchma.validate(reqBody);
}