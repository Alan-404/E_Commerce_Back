const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/:slug', productController.getProductByCategory);
router.post('/insert', productController.insertProduct)

router.put('/modify', productController.modifyProduct);
router.delete('/delete', productController.deleleProduct);
router.get('/', productController.getProduct)


module.exports = router;