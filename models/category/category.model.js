
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    recipeCount: { type: Number, default: 0 },
    recipes: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Recipe'
    }]
});


module.exports = mongoose.model('Category', categorySchema);



