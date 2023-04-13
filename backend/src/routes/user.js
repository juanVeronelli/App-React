const userController = require('../controllers/user');
const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

// add user
router.post('/register', userController.add);

//get user
router.get('/login', userController.get);



module.exports = router
