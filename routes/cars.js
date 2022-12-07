
const express = require('express');
const { auth } = require('../middlewares/auth');
const { CarModel, validteCar } = require('../models/carModel');
const router = express.Router();

router.get('/', async (req, res) => {
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 10;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    try {
        let data = await CarModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
router.get("/prices", async (req, res) => {
    let min = Number(req.query.min) || 1;
    let max = Number(req.query.max) || 1000000;
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 10

    try {
        let data = await CarModel.find({ price: { $gte: min, $lte: max } })
            .limit(perPage)
            .skip((page - 1) * perPage)
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
router.get("/search", async (req, res) => {

    let perPage = Number(req.query.perPage) || 10;
    let page = Number(req.query.page) || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    let searchQ = req.query.s;

    try {
        let searchExp = new RegExp(searchQ, "i");
        let data = await CarModel.find({ $or: [{ company: searchExp }, { info: searchExp }] })
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })
        res.json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get('/:category', async (req, res) => {
    let params = req.params.category;
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 10
    let paramsExp = new RegExp(params, "i")
    try {
        let data = await CarModel.find({ category: paramsExp })
            .limit(perPage)
            .skip((page - 1) * perPage)
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

})
router.get('/userList', auth, async (req, res) => {

    try {
        let data = await CarModel.find({ user_id: req.tokenData._id })
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.post('/', auth, async (req, res) => {
    let validateBody = validteCar(req.body);
    if (validateBody.error) {
        return res.status(400).json(validateBody.error.details);
    }
    try {
        let data = new CarModel(req.body);
        data.user_id = req.tokenData._id;
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
router.put('/:idUpdate', auth, async (req, res) => {
    let validateBody = validteCar(req.body);
    if (validateBody.error) {
        return res.status(400).json(validateBody.error.details)
    }
    try {
        let idUpdate = req.params.idUpdate;
        let data = await CarModel.updateOne({ _id: idUpdate, user_id: req.tokenData._id }, req.body);
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
router.delete('/:idDel', auth, async (req, res) => {

    try {
        let idDel = req.params.idDel;
        let data = await CarModel.deleteOne({ _id: idDel, user_id: req.tokenData._id });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})


module.exports = router;


module.exports = router;
