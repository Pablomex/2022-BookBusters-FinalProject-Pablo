/* eslint-disable prefer-regex-literals */
const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
    bio: Joi.string(),
    postalCode: Joi.string()
        .required()
        .pattern(
            new RegExp(/(58180|34280|20600|20620|20300)|^(?!00|96|99)(?!20[3-9])\d{5}(?<![12]80)$/),
        ),
    communeCode: Joi.string().required(),
/*
    location: Joi.string().pattern(
        new RegExp(
    /^\([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)\)$/,
        ),
    ),
*/
    mail_donation: Joi.boolean().default(true),
    mail_alert: Joi.boolean().default(true),
    avatar_id: Joi.number().integer().default(1),
});
