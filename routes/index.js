const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controller/home_controller');

router.get('/', homeController.home);
router.get('/register', homeController.register);
router.post('/create', homeController.create);
router.post('/create-session', homeController.createSession);
router.get('/login', homeController.login);
router.get('/profile', homeController.profile);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/register'}), homeController.profile);

module.exports = router;