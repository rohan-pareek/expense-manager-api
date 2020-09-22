const express = require('express');
const router = express.Router();
const ExpenseController = require('../Controller/ExpenseController');

router.post('/addExpense', ExpenseController.addExpense);
router.post('/fetchExpenses', ExpenseController.fetchExpenses);

module.exports = router;