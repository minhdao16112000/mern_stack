const express = require('express');
const router = express.Router();
const imageController = require('../controllers/ImageController');

router.post('/store', imageController.uploadImg, imageController.store);
router.put('/:id', imageController.uploadImg, imageController.update);
router.patch('/restore', imageController.restore);
router.patch('/:id', imageController.active);
router.delete('/force', imageController.forceDestroy);
router.delete('/', imageController.destroy);
router.get('/trash', imageController.trash);
router.get('/:id/edit', imageController.showById);
router.get('/:slug', imageController.showBySlug);
router.get('/', imageController.show);
// router.post('/handle-form-actions', imageController.handleFormAction);

module.exports = router;