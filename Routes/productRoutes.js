const express = require('express');
const controller = require('../Controllers/productController');
const {authentication, authorization} = require('../MiddleWare/AuthMiddleware');

const router = express.Router();

// Public access (optional to protect)
router.get('/', controller.getAllProduct);
router.get('/:id', controller.getOneProduct);

// Only authenticated users can create, update, or delete
router.post('/', authentication, authorization(['admin', 'manager']), controller.CreateProduct);
router.put('/:id', authentication, authorization(['admin', 'manager']), controller.UpdateProduct);
router.delete('/:id', authentication, authorization(['admin']), controller.DeleteProduct);

module.exports = router;