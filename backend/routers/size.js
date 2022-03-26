const express = require('express');
const router = express.Router();

const sizeController = require('../controllers/SizeController');

router.post('/store', sizeController.store);
// router.post('/handle-form-actions', sizeController.handleFormAction);
router.put('/:id', sizeController.update);
router.patch('/restore', sizeController.restore);
router.delete('/force', sizeController.forceDestroy);
router.delete('/', sizeController.destroy);
router.get('/:id/edit', sizeController.showById);
router.get('/trash', sizeController.trash);
router.get('/', sizeController.show);
// router.get('/:slug', sizeController.show);

module.exports = router;