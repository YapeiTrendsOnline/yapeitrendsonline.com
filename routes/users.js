const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        res.send('User logged in successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;



