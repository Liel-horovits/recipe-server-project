



const express = require('express');
const router = express.Router();
const Category = require('../models/category/category.model');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});

module.exports = router; 