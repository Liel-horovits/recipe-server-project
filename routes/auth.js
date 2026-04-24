const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user/user.model');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    console.log('--- Register route was hit! ---');
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'המשתמש כבר קיים במערכת' });
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'המשתמש נרשם בהצלחה!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('שגיאת שרת');
    }
});


console.log('--- Auth Routes are being loaded! ---');

router.post('/login', async (req, res) => {
    console.log('--- Login route was hit! ---');
    try {
        const {email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'משתמש לא קיים' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'סיסמה שגויה' });
        }

        const token = jwt.sign(
             { id: user._id, role: user.role }, 
             process.env.JWT_SECRET, 
             { expiresIn: '1h' } 
);

  res.json({ 
    message: 'התחברת בהצלחה!',
    token: token,
    user: {
        username: user.username,
        email: user.email,
        role: user.role 
    }
});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('שגיאת שרת');
    }
});


const { auth, admin } = require('../middlewares/authMiddleware');

router.get('/all', [auth, admin], async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (err) {
        res.status(500).send('שגיאת שרת');
    }
});





module.exports = router;