// controllers/expenseController.js
const Expense = require('../models/expenseModel');
const Settlement = require('../models/settlementModel');

// Add a new expense
const addExpense = async (req, res) => {
    try {
        const { group, amount, description, date, participants, receipt } = req.body;
        const expense = await Expense.create({
            group,
            user: req.user._id,
            amount,
            description,
            date,
            participants,
            receipt
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get expenses for a specific group
const getGroupExpenses = async (req, res) => {
    try {
        const { groupId } = req.params;

        // Fetch all expenses and settlements for the group
        const expenses = await Expense.find({ group: groupId });
        const settlements = await Settlement.find({ $or: [{ payer: req.user._id }, { receiver: req.user._id }] });

        // Calculate user balances
        const balances = {};

        expenses.forEach((expense) => {
            if (!expense.settled) {
                if (!balances[expense.user]) {
                    balances[expense.user] = 0;
                }
                balances[expense.user] += expense.amount;
            }
        });

        settlements.forEach((settlement) => {
            if (settlement.payer.equals(req.user._id)) {
                balances[settlement.receiver] = (balances[settlement.receiver] || 0) - settlement.amount;
            } else if (settlement.receiver.equals(req.user._id)) {
                balances[settlement.payer] = (balances[settlement.payer] || 0) + settlement.amount;
            }
        });

        // Separate creditors and debtors
        const creditors = {};
        const debtors = {};

        for (const userId in balances) {
            if (balances[userId] > 0) {
                creditors[userId] = balances[userId];
            } else if (balances[userId] < 0) {
                debtors[userId] = -balances[userId];
            }
        }

        // Example response
        res.json({ creditors, debtors });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// controllers/expenseController.js
const getUserBalances = async (req, res) => {
    try {
        const { groupId } = req.params;

        // Fetch all expenses and settlements for the group
        const expenses = await Expense.find({ group: groupId });
        const settlements = await Settlement.find({ $or: [{ payer: req.user._id }, { receiver: req.user._id }] });

        // Calculate user balances
        const balances = {};

        expenses.forEach((expense) => {
            if (!expense.settled) {
                if (!balances[expense.user]) {
                    balances[expense.user] = 0;
                }
                balances[expense.user] += expense.amount;
            }
        });

        settlements.forEach((settlement) => {
            if (settlement.payer.equals(req.user._id)) {
                balances[settlement.receiver] = (balances[settlement.receiver] || 0) - settlement.amount;
            } else if (settlement.receiver.equals(req.user._id)) {
                balances[settlement.payer] = (balances[settlement.payer] || 0) + settlement.amount;
            }
        });

        res.json({ balances });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// controllers/expenseController.js
const getUserDebtsAndCredits = async (req, res) => {
    try {
        const { groupId, userId } = req.params;

        // Fetch all expenses and settlements for the group
        const expenses = await Expense.find({ group: groupId });
        const settlements = await Settlement.find({ $or: [{ payer: userId }, { receiver: userId }] });

        // Calculate user balances
        const balances = {};

        expenses.forEach((expense) => {
            if (!expense.settled) {
                if (!balances[expense.user]) {
                    balances[expense.user] = 0;
                }
                balances[expense.user] += expense.amount;
            }
        });

        settlements.forEach((settlement) => {
            if (settlement.payer.equals(userId)) {
                balances[settlement.receiver] = (balances[settlement.receiver] || 0) - settlement.amount;
            } else if (settlement.receiver.equals(userId)) {
                balances[settlement.payer] = (balances[settlement.payer] || 0) + settlement.amount;
            }
        });

        // Separate debts and credits
        const debts = {};
        const credits = {};

        for (const otherUserId in balances) {
            if (balances[otherUserId] > 0) {
                debts[otherUserId] = balances[otherUserId];
            } else if (balances[otherUserId] < 0) {
                credits[otherUserId] = -balances[otherUserId];
            }
        }

        res.json({ debts, credits });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addExpense, getGroupExpenses, getUserBalances, getUserDebtsAndCredits };


