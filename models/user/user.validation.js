
const Joi = require('joi');

const userJoiSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    address: Joi.string().required(),
    role: Joi.string().valid('admin', 'user')
});

module.exports = userJoiSchema;