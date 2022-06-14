const express = require('express');
const passport = require('passport');
const router = express.Router();
const voucherController = require('../controllers/VoucherController');
require('../config/passport/passport');

// router.post('/send-email', orderController.sendEmail);
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    voucherController.store
);

router.get(
    '/trash',
    passport.authenticate('jwt', { session: false }),
    voucherController.trash
);
router.get('/:code', voucherController.showByCode);
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    voucherController.show
);

router.delete('/force', voucherController.forceDestroy);
router.delete('/', voucherController.destroy);

router.patch(
    '/restore',
    passport.authenticate('jwt', { session: false }),
    voucherController.restore
);

// router.put('/:id/pay', orderController.update);
// router.put('/:id/delivered', orderController.delivered);
// router.patch('/:id/status', orderController.status);

// router.get('/:id/mine', orderController.showByMine);
// router.get('/:id', orderController.showById);

module.exports = router;
