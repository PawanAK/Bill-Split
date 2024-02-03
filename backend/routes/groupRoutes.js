// groupRoutes.js
const express = require('express');
const router = express.Router();
const { createGroup, getUserGroups } = require('../controllers/userController');
const groupController = require('../controllers/groupController');

// Group-related routes
router.post('/createGroup', createGroup);
router.get('/getUserGroups', getUserGroups);

module.exports = router;
