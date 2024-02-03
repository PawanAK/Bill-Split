// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/requireAuth');
const groupController = require('../controllers/groupController');

// Create a new group (requires authentication)
router.post('/createGroup', authenticateUser, groupController.createGroup);

// Get user's groups (requires authentication)
router.get('/getUserGroups', authenticateUser, groupController.getUserGroups);

// Invite user to a group (requires authentication)
router.post('/inviteToGroup/:groupId', authenticateUser, groupController.inviteToGroup);

module.exports = router;
