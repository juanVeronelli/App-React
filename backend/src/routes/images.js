const express = require('express');
const router = express.Router();
const Controller = require('../controllers/images');
const {verifyToken} = require('../middlewares/auth');



//get images and verify JWT token
router.get('/g', verifyToken, Controller.get);


module.exports = router

