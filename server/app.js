
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Expense = require('./Model/Expense');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./Model/User');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(cookieParser());

app.use(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, 'secret12');
            const user = await User.findById(decoded.userId);
            req.user = user;
        }
        else{
            req.user = null;
        }
    } catch (err) {
        console.error('Error verifying token:', err.message);
    }
    next();
});

app.use(expenseRoutes);
app.use('/api', authRoutes);

app.listen(8080, () => {
    console.log("Server connected at port 8080");
});
