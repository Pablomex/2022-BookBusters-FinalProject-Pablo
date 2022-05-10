/**
 * Controller wrapper to manage errors
 * @param {object} controllerMethod a controller to execute inside a try… catch… block
 * @returns {object} a controller as middleware function
 */
const controllerWrapperAsync = (controllerMethod) => {
    const mmw = async (request, response, next) => {
        try {
            await controllerMethod(request, response, next);
        } catch (error) {
            next(error);
        }
    };
    return mmw;
};

module.exports = controllerWrapperAsync;
