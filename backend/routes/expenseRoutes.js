// expenseRoutes.js
const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/requireAuth');
const { addExpense, getGroupExpenses } = require('../controllers/expenseController');


// Expense-related routes
router.post('/addExpense',authenticateUser, addExpense);
router.get('/groupExpenses/:groupId',authenticateUser, getGroupExpenses);

module.exports = router;
