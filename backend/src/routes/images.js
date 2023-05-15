const express = require('express');
const router = express.Router();
const Controller = require('../controllers/images');
const { verifyToken } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');


//get images and verify JWT token
router.get('/g', verifyToken, Controller.get);

//protected Routes #################
router.post('/upload', upload.single("image"), Controller.post);


module.exports = router

