const { ApiError } = require('../middlewares/handleError');

/**
 * Validation middleware with Joi
 * @param {Schema} schema Joi schema to validate against
 * @param {string} dataOrigin Request property to validate (body, query, params)
 * @returns {string} 400 Error message
 */
const validator = (schema, dataOrigin) => {
    const myMw = (request, response, next) => {
        // validate sur le request.body

        const { error } = schema.validate(request[dataOrigin]);
        // checker la présence de la propriété error
        // si elle est présente, on renvoie au front un message d'erreur
        if (error) {
            throw new ApiError(error.message, { statusCode: 400 });
        }
        // sinon, on passe le bébé au middleware suivant
        return next();
    };
    return myMw;
};

module.exports = validator;
