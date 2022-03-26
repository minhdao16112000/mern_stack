const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/store', productController.uploadImg, productController.store);
router.put('/:id', productController.uploadImg, productController.update);
router.patch('/decrease-qty', productController.decreaseQty);
router.patch('/restore', productController.restore);
router.patch('/:id', productController.active);
router.delete('/force', productController.forceDestroy);
router.delete('/', productController.destroy);
router.get('/trash', productController.trash);
router.get('/search', productController.search);
router.get('/:id/edit', productController.showById);
router.get('/:slug', productController.showBySlug);
router.get('/', productController.show);
// router.post('/handle-form-actions', productController.handleFormAction);
// router.get('/:slug', productController.showBySlug);

module.exports = router;
