const express = require('express');
const router = express.Router();
const topicController = require('../controllers/TopicController');

router.post('/store', topicController.store);
router.put('/:id', topicController.update);
router.patch('/restore', topicController.restore);
router.patch('/:id', topicController.active);
router.delete('/:id/force', topicController.forceDestroy);
router.delete('/', topicController.destroy);
router.get('/:id/edit', topicController.edit);
router.get('/trash', topicController.trash);
router.get('/', topicController.show);
// router.post('/handle-form-actions', topicController.handleFormAction);
// router.get('/:slug', topicController.show);
module.exports = router;