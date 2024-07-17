const express = require('express');
const router = express.Router();
const Expense = require('../Model/Expense');
const User = require('../Model/User');
const Income = require('../Model/Income');
const Objective = require('../Model/Objective'); 

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

router.post('/reset-balance', checkAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    await Income.deleteMany({ user: userId });
    await Expense.deleteMany({ user: userId });

    req.user.incomes = [];
    req.user.expenses = [];
    await req.user.save();

    res.status(200).json({ message: 'Balance reset successfully' });
  } catch (err) {
    console.error('Error resetting balance:', err.message);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
});

// Route to set objectives
router.post('/set-objective', checkAuth, async (req, res) => {
  const { savingsObjective, expensesObjective } = req.body;

  try {
    const userId = req.user._id;
    let objective = await Objective.findOne({ userId });

    if (objective) {
      
      objective.savingsObjective = savingsObjective;
      objective.expensesObjective = expensesObjective;
      await objective.save();
    } else {
      
      objective = new Objective({ userId, savingsObjective, expensesObjective });
      await objective.save();
    }

    res.status(200).json({ message: 'Objective set successfully', objective });
  } catch (error) {
    res.status(500).json({ message: 'Error setting objective', error });
  }
});


router.get('/get-objective', checkAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const objective = await Objective.findOne({ userId });

    if (objective) {
      res.status(200).json(objective);
    } else {
      res.status(404).json({ message: 'Objective not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting objective', error });
  }
});

module.exports = router;
