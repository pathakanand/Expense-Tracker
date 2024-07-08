const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const cookieParser=require('cookie-parser');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.get('/register', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, ConfirmPassword,Mobile} = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists. You can login.', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            ConfirmPassword,
            Mobile
        });

        res.status(201).json({ message: 'Signup successful.', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'User not found.', success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Invalid password.', success: false });
        }

        const token = jwt.sign({ userId: user._id }, 'secret12');

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful.', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  });
  

module.exports = router;
