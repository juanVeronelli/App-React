const userController = require('../controllers/user');
const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();
const { upload } = require('../middlewares/multer');

// add user
router.post('/register', userController.add);

//get user
router.post('/login', userController.get);

//get profile user
router.get('/profile', userController.find)

//Protected Routes #########################

//update user
router.post('/upload', verifyToken, upload.single("profilePicture"), userController.update)

module.exports = router
