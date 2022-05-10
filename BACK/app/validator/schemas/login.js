const Joi = require('joi');

module.exports = Joi.object({
    login: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string(),
}).required();
