const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Recipe = require('../models/recipe/recipe.model');
const Category = require('../models/category/category.model');
const recipeJoiSchema = require('../models/recipe/recipe.validation');
const { auth } = require('../middlewares/authMiddleware');

router.post('/', auth, async (req, res) => {
    const { error } = recipeJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: { message: error.details[0].message } });
    }

    try {
        const { recipeName, description, category, preparationTime, difficulty, layers, instructions, image, isPrivate } = req.body;

        const newRecipe = new Recipe({
            recipeName,
            description,
            category,
            preparationTime,
            difficulty,
            layers,
            instructions,
            image,
            isPrivate,
            userOwner: req.user.id 
        });

        const savedRecipe = await newRecipe.save();

        let categoryDoc = await Category.findOne({ description: category });

        if (!categoryDoc) {
            categoryDoc = new Category({
                code: `CAT-${Date.now()}`, 
                description: category,
                recipeCount: 1,
                recipes: [savedRecipe._id]
            });
        } else {
            categoryDoc.recipeCount += 1;
            categoryDoc.recipes.push(savedRecipe._id);
        }

        await categoryDoc.save();

        res.status(201).json(savedRecipe);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: { message: 'שגיאת שרת בעת שמירת המתכון' } });
    }
});



router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const skip = (page - 1) * perPage;

        const search = req.query.search || "";
        const searchFilter = {
            $or: [
                { recipeName: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        };

        const token = req.header('x-auth-token');
        let userId = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;
            } catch (err) {
                return res.status(401).json({ error: { message: 'הטוקן אינו תקין' } });
            }
        }

        const finalQuery = {
            ...searchFilter,
            $or: [
                { isPrivate: false },
                { isPrivate: true, userOwner: userId }
            ]
        };

        const recipes = await Recipe.find(finalQuery)
            .skip(skip)
            .limit(perPage)
            .populate('userOwner', 'name email');

        res.json(recipes);

    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('userOwner', 'name email');
        if (!recipe) {
            return res.status(404).json({ error: { message: 'מתכון לא נמצא' } });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: { message: 'ID לא תקין' } });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: { message: 'מתכון לא נמצא' } });

        if (recipe.userOwner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: { message: 'אין לך הרשאה למחוק מתכון זה' } });
        }

        await Recipe.findByIdAndDelete(req.params.id);
        
        await Category.findOneAndUpdate(
            { description: recipe.category },
            { $inc: { recipeCount: -1 }, $pull: { recipes: recipe._id } }
        );

        res.json({ message: 'המתכון נמחק בהצלחה' });
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});


router.get('/time/:minutes', async (req, res) => {
    try {
        const { minutes } = req.params;
        
        const recipes = await Recipe.find({ 
            preparationTime: { $lte: parseInt(minutes) },
            isPrivate: false 
        }).populate('userOwner', 'name');

        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});


router.put('/:id', auth, async (req, res) => {
    const { error } = recipeJoiSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.details[0].message } });

    try {
        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: { message: 'מתכון לא נמצא' } });

        if (recipe.userOwner.toString() !== req.user.id) {
            return res.status(403).json({ error: { message: 'אין לך הרשאה לעדכן מתכון זה' } });
        }

        recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } 
        );

        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: { message: err.message } });
    }
});





module.exports = router;