
const Joi = require('joi');

const categoryJoiSchema = Joi.object({
    code: Joi.string().required(),
    description: Joi.string().min(3).required(),
    recipeCount: Joi.number().integer().min(0).default(0),
    recipes: Joi.array().items(Joi.string()).default([])
});

module.exports = categoryJoiSchema;
