const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({           
    recipeName: { type: String, required: true }, 
    description: { type: String, required: true }, 
    category: { type: String, required: true },
    preparationTime: { type: Number, required: true, min: 1 }, 
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }, 
    addedDate: {
        type: Date,
        default: Date.now 
    },
    layers: [{
        description: { type: String, required: true },
        ingredients: { type: [String], required: true } 
    }],
    instructions: { type: [String], required: true }, 
    image: { type: String, default: "" },
    isPrivate: { type: Boolean, default: false }, 
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);