// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/requireAuth');


router.post('/addExpense', authMiddleware, expenseController.addExpense);
router.get('/groupExpenses/:groupId', authMiddleware, expenseController.getGroupExpenses);
router.get('/userBalances/:groupId', authMiddleware, expenseController.getUserBalances);
router.get('/userDebtsAndCredits/:groupId/:userId', authMiddleware, expenseController.getUserDebtsAndCredits);

module.exports = router;