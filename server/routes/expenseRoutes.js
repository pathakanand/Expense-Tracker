const express = require('express');
const router = express.Router();
const Expense = require('../Model/Expense');


router.get('/',(req,res)=>{
    res.send("hi! this is server of expense-tracker");
});

router.get('/expenses', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const userId = req.user._id;
        const expenses = await Expense.find({ user: userId });
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err.message);
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});

router.post('/expenses', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
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

module.exports = router;
