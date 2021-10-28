const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const verifyToken = require('../middleware/auth')

router.post('/login', accountController.loginAccount);
router.put('/password',verifyToken,  accountController.changePassword);
router.get('/', verifyToken, accountController.getAccount);

module.exports = router;