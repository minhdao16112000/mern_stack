const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');

router.post('/', contactController.store);
router.put('/:id', contactController.update);
router.patch('/restore', contactController.restore);
router.patch('/:id', contactController.active);
router.delete('/force', contactController.forceDestroy);
router.delete('/', contactController.destroy);
router.get('/:id/edit', contactController.showById);
router.get('/trash', contactController.trash);
router.get('/', contactController.show);
// router.get('/:slug', contactController.showBySlug);
// router.post('/handle-form-actions', contactController.handleFormAction);

module.exports = router;