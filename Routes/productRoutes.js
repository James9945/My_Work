const express = require('express');
const controller = require('../Controllers/productController');
const router = express.Router();


router.post('/',controller.CreateProduct);
router.get('/',controller.getAllProduct);
router.get('/:id',controller.getOneProduct);
router.put('/:id',controller.UpdateProduct);
router.delete('/:id',controller.DeleteProduct);

module.exports = router;