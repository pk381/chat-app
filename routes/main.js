const express = require('express');
const mainController = require('../controllers/main');

const authantication = require('../middelware/auth');

const router = express.Router();

router.get('/', mainController.getMain);

router.get('/messages/:lastId', authantication.authantication, mainController.getMessages);

router.post('/message', authantication.authantication, mainController.postMessage);

router.post('/new-friend', authantication.authantication, mainController.makeNewFriend);

router.get('/all-friend', authantication.authantication, mainController.getAllFriends);


module.exports = router;