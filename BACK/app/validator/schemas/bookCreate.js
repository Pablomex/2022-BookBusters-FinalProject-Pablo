const Joi = require('joi');

//TODO : modifier le schema pour que isbn10 ou isbn 13 soit obligatoire
module.exports = Joi.object({
    isbn13: Joi.string().pattern(new RegExp(/^97[8-9]\d{10}$/)),
    isbn10: Joi.string().pattern(new RegExp(/^\d{9}(\d||x||X)$/)),
    is_in_library:Joi.boolean().required(),
    is_in_donation:Joi.boolean().required(),
    is_in_favorite:Joi.boolean().required(),
    is_in_alert:Joi.boolean().required()
}).min(1).required();
