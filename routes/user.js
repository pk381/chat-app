const express = require('express');
const userControllers = require('../controllers/user');

const router = express.Router();

router.get('/', userControllers.getSignUp);

router.post('/sign_up', userControllers.postSignUp);

module.exports = router;