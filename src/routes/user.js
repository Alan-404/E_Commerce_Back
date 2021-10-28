const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');

router.post('/register', userController.insertUser);
router.put('/infor', verifyToken,  userController.updateUser);

module.exports = router;