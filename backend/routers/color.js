const express = require('express');
const router = express.Router();

const colorController = require('../controllers/ColorController');

router.post('/store', colorController.store);
// router.post('/handle-form-actions', colorController.handleFormAction);
router.put('/:id', colorController.update);
router.patch('/restore', colorController.restore);
router.delete('/force', colorController.forceDestroy);
router.delete('/', colorController.destroy);
router.get('/trash', colorController.trash);
router.get('/:id/edit', colorController.showById);
router.get('/', colorController.show);
// router.get('/:slug', colorController.show);

module.exports = router;