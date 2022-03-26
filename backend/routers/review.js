const express = require('express');
const router = express.Router();

const reviewModel = require('../controllers/ReviewController');

router.get('/create', reviewModel.create);
router.post('/store', reviewModel.uploadImg, reviewModel.store);
router.get('/:id/edit', reviewModel.edit);
router.post('/handle-form-actions', reviewModel.handleFormAction);
router.put('/:id', reviewModel.uploadImg, reviewModel.update);
router.patch('/:id/restore', reviewModel.restore);
router.delete('/:id', reviewModel.destroy);
router.delete('/:id/force', reviewModel.forceDestroy);
router.get('/trash', reviewModel.trash);
// router.get('/:slug', reviewModel.showBySlug);
router.get('/', reviewModel.show);

module.exports = router;