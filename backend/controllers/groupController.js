// groupController.js
const Group = require('../models/groupModel');

// Create a new group
const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const group = await Group.create({ name, description, members: [req.user._id] });
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user's groups
const getUserGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user._id });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { createGroup, getUserGroups };
