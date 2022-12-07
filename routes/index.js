const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
 res.json({msg: 'Api work 200'})
})

module.exports = router;