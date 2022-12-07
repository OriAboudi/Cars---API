const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');

exports.auth = async (req, res, next) => {

    let token = req.header('x-api-key');
    if (!token) {
        return res.status(401).json({
            msg: "You must be logged in token"
        })
    }
    try {
        let decodedToken = jwt.verify(token, `${config.tokenSecret}`);
        req.tokenData = decodedToken;
        next()
    } catch (error) {
        res.status(404).json({msg: "Token invalid or expired"})
    }
}