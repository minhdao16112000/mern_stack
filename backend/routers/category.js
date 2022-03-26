const express = require('express');
const router = express.Router();
const catController = require('../controllers/CategoryController');

router.post('/store', catController.uploadImg, catController.store);
router.put('/:id', catController.uploadImg, catController.update);
router.patch('/restore', catController.restore);
router.patch('/:id', catController.active);
router.delete('/:id/force', catController.forceDestroy);
router.delete('/', catController.destroy);
router.get('/:id/edit', catController.edit);
router.get('/trash', catController.trash);
router.get('/', catController.show);
// router.post('/handle-form-actions', catController.handleFormAction);
// router.get('/:slug', catController.show);
module.exports = router;