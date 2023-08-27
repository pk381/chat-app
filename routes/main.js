const express = require('express');
const mainController = require('../controllers/main');

const authantication = require('../middelware/auth');

const router = express.Router();

router.get('/', mainController.getMain);

router.post('/message', authantication.authantication, mainController.postMessage);

module.exports = router;