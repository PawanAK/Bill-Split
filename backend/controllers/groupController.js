// controllers/groupController.js
const Group = require('../models/groupModel');
const User = require('../models/userModel');

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

// Invite user to a group
const inviteToGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { email } = req.body;

        // Check if the invited user exists
        const invitedUser = await User.findOne({ email });

        if (!invitedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user is already a member of the group
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (group.members.includes(invitedUser._id)) {
            return res.status(400).json({ error: "User is already a member of the group" });
        }

        // Add the user to the group
        group.members.push(invitedUser._id);
        await group.save();

        res.status(200).json({ message: "User successfully added to the group" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { createGroup, getUserGroups, inviteToGroup };
