
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    code: String,
    description: String,
    recipeCount: Number,
    recipes: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Recipe'
    }]
});


module.exports = mongoose.model('Category', categorySchema);



