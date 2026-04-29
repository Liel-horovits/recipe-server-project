
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


router.get('/:code', async (req, res) => {
    try {
        const category = await Category.findOne({ code: req.params.code });
        if (!category) {
            return res.status(404).json({ error: { message: 'קטגוריה לא נמצאה' } });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});


router.get('/:code/recipes', async (req, res) => {
    try {
        const category = await Category.findOne({ code: req.params.code })
            .populate('recipes'); 
            
        if (!category) {
            return res.status(404).json({ error: { message: 'קטגוריה לא נמצאה' } });
        }
        res.json(category.recipes);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});

module.exports = router;