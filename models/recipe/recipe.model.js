const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = Schema({           
     recipeName: String,
     description: String,
     category: String,
     preparationTime: Number,
     difficulty: {
         type: Number,
         min: 1,
         max: 5
     },
     addedDate: {
         type: Date,
         default: Date.now
     },
     layers: [{
         description: String,
         ingredients: [String]
     }],
     instructions: [String], 
     image: String,
     isPrivate: { type: Boolean, default: false },
     userOwner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     }

});


module.exports = mongoose.model('Recipe', RecipeSchema);


