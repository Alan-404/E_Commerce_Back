const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController')

router.post('/insert', advertisementController.addAd);
router.get('/', advertisementController.getAd);

module.exports = router;