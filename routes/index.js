const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');

router.get('/', homeController.home);
router.get('/register', homeController.register);
router.get('/login', homeController.login);
router.get('/profile', homeController.profile);

module.exports = router;