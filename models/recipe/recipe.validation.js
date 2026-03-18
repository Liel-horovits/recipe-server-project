const Joi = require('joi');

const recipeJoiSchema = Joi.object({
    recipeName: Joi.string().min(2).required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    preparationTime: Joi.number().positive().required(),
    difficulty: Joi.number().integer().min(1).max(5).required(),
    layers: Joi.array().items(
        Joi.object({
            description: Joi.string().required(),
            ingredients: Joi.array().items(Joi.string()).min(1).required()
        })
    ).min(1).required(),
    instructions: Joi.array().items(Joi.string()).min(1).required(),
    image: Joi.string().allow(''),
    isPrivate: Joi.boolean().default(false),
    userOwner: Joi.string().required()
});

module.exports = recipeJoiSchema;