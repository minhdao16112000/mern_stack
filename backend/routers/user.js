const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/UserController');
require('../config/passport/passport');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/forgetPassword', userController.forgetPassword);
router.post('/userRole', userController.getRole);
router.put('/changePassword', userController.changePassword);
router.put('/:id/info', userController.uploadImg, userController.updateInfo);
router.put('/:id', userController.update);
router.patch('/restore', userController.restore);
router.patch('/:id/favorites', userController.addFavorites);
router.delete('/force', userController.forceDestroy);
router.delete('/', userController.destroy);
router.get(
    '/login-google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
    }),
    userController.redirectToken
);
router.get(
    '/login-facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/',
    }),
    userController.redirectToken
);
router.get('/login-google/success', userController.successLogin);
router.get('/login-facebook/success', userController.successLogin);
router.get(
    '/login-google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);
router.get('/login-facebook', passport.authenticate('facebook'));
router.get('/trash', userController.trash);
router.get('/:id/edit', userController.edit);
router.get('/', userController.show);
// router.post('/handle-form-actions', userController.handleFormAction);
// router.get('/:slug', userController.showBySlug);

module.exports = router;
