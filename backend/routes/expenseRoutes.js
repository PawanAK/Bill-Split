// expenseRoutes.js
const express = require('express');
const router = express.Router();
const { addExpense, getGroupExpenses } = require('../controllers/userController');


// Expense-related routes
router.post('/addExpense', addExpense);
router.get('/groupExpenses/:groupId', getGroupExpenses);

module.exports = router;
