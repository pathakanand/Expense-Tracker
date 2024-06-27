const express=require('express');
const router=express.Router();
const Expense=require('../Model/Expense');

router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find({});
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err.message);
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});

router.post('/expenses', async (req, res) => {
    const { description, amount } = req.body;

    const newExpense = new Expense({
        description,
        amount
    });

    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        console.error('Error saving expense:', err.message);
        res.status(400).json({ message: 'Error saving expense: ' + err.message });
    }
});

module.exports=router;