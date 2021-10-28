const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.post('/insert', categoryController.insertCategory);
router.post('/name', categoryController.getNameCategory);
router.get('/', categoryController.getAllCategory);

module.exports = router