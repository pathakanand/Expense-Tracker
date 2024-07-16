const express = require('express');
const router = express.Router();
const Expense = require('../Model/Expense');
const User = require('../Model/User');
const Income = require('../Model/Income');

const checkAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  next();
};


router.get('/expenses', checkAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err.message);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});


router.post('/expenses', checkAuth, async (req, res) => {
  try {
    const { description, amount } = req.body;
    const userId = req.user._id;

    const newExpense = new Expense({
      description,
      amount,
      user: userId
    });

    const savedExpense = await newExpense.save();
    req.user.expenses.push(savedExpense._id);
    await req.user.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    console.error('Error saving expense:', err.message);
    res.status(400).json({ message: 'Error saving expense: ' + err.message });
  }
});

router.get('/total-expenses', checkAuth, async (req, res) => {
  try {
    const totalExpenses = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
          expenses: { $push: { _id: "$_id", description: "$description", amount: "$amount" } }
        }
      }
    ]);
    res.json(totalExpenses[0] || { total: 0, expenses: [] });
  } catch (err) {
    console.error('Error fetching total expenses:', err.message);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

// Get total income with details for the authenticated user
router.get('/total-income', checkAuth, async (req, res) => {
  try {
    const totalIncome = await Income.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
          incomes: { $push: { _id: "$_id", description: "$description", amount: "$amount", date: "$date" } }
        }
      }
    ]);
    res.json(totalIncome[0] || { total: 0, incomes: [] });
  } catch (err) {
    console.error('Error fetching total income:', err.message);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

// Add a new income for the authenticated user
router.post('/income', checkAuth, async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const userId = req.user._id;

    const newIncome = new Income({
      description,
      amount,
      user: userId,
      date: date || Date.now() 
    });

    const savedIncome = await newIncome.save();
    req.user.incomes.push(savedIncome._id);
    await req.user.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    console.error('Error saving income:', err.message);
    res.status(400).json({ message: 'Error saving income: ' + err.message });
  }
});

module.exports = router;
