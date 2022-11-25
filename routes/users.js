const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { auth } = require('../middlewares/auth');
const { validteUser, userModel, validteLogin, creatToken } = require('../models/userModel');



router.get('/myUser', auth, async (req, res) => {
    try {
        let data = await userModel.findOne({ _id: req.tokenData._id }, { password: 0 });
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
router.post('/signup', async (req, res) => {
    let validateBody = validteUser(req.body);
    if (validateBody.error) {
        res.status(500).json(error);
    }
    try {
        let user = new userModel(req.body)
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "**********"
        res.status(201).json(user);

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ msg: "email already in use" });
        }
        console.log(error);
        res.status(500).json(error);
    }
    res.json({ msg: 'index work!' })
})
router.post('/login', async (req, res) => {
    let validateBody = validteLogin(req.body);
    if (validateBody.error) {
        return res.status(400).json(validateBody.error.details);
    }
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({

                msg: 'User not found ,code 1'
            })
        }
        let validetPassword = await bcrypt.compare(req.body.password, user.password);
      
        if (!validetPassword) {
            return res.status(401).json({
                msg: 'User not found ,code 2'
            })

        }
        let token = creatToken(user._id);
        res.status(201).json({ token: token });

    } catch (err) {

        console.log(err);
        res.status(500).json(err);
    }

})

module.exports = router;