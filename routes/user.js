const express = require('express');
const userControllers = require('../controllers/user');

const router = express.Router();

router.get('/', userControllers.GetSignUp);

module.exports = router;