const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ error: { message: 'אין טוקן, גישה נדחתה' } });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: { message: 'הטוקן אינו תקין' } });
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: { message: 'גישה נדחתה: נדרשת הרשאת מנהל' } });
    }
    next();
};

module.exports = { auth, admin };