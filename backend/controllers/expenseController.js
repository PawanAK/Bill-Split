// expenseController.js
const Expense = require('../models/expenseModel');

// Add a new expense
const addExpense = async (req, res) => {
    try {
        const { group, amount, description, date, receipt } = req.body;
        const expense = await Expense.create({
            group,
            user: req.user._id,
            amount,
            description,
            date
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
        const expenses = await Expense.find({ group: groupId });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addExpense, getGroupExpenses };
