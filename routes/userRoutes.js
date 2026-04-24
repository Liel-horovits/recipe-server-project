
const express = require('express');
const router = express.Router();
const User = require('../models/user/user.model');
const { auth } = require('../middlewares/authMiddleware');

router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: { message: 'גישה נדחתה: נדרשות הרשאות מנהל' } });
        }

        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: { message: 'גישה נדחתה: נדרשות הרשאות מנהל' } });
        }

        const userToDelete = await User.findById(req.params.id);
        if (!userToDelete) {
            return res.status(404).json({ error: { message: 'משתמש לא נמצא' } });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'המשתמש נמחק בהצלחה' });
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});

module.exports = router;