const express = require('express');
const groupController = require('../controllers/group');

const authantication = require('../middelware/auth');

const router = express.Router();

router.post('/create-group', authantication.authantication, groupController.postCreateGroup);

router.get('/all-group', authantication.authantication, groupController.getAllGroups);

router.post('/add-user-to-group', authantication.authantication, groupController.addUserToGroup);

module.exports = router;