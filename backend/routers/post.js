const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

router.post('/store', postController.uploadImg, postController.store);
router.put('/:id', postController.uploadImg, postController.update);
router.patch('/restore', postController.restore);
router.patch('/:id', postController.active);
router.delete('/force', postController.forceDestroy);
router.delete('/', postController.destroy);
router.get('/trash', postController.trash);
router.get('/:id/edit', postController.showById);
router.get('/:slug', postController.showBySlug);
router.get('/', postController.show);
// router.post('/handle-form-actions', postController.handleFormAction);

module.exports = router;