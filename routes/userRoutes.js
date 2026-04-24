
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "נתיב משתמשים עובד" });
});

module.exports = router; 