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

module.exports = { addExpense, getGroupExpenses };
