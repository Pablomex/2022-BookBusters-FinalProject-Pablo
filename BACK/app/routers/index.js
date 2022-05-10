const { Router } = require('express');

const { ApiError } = require('../middlewares/handleError');
const { handleError } = require('../middlewares/handleError');

const bookRouter = require('./bookRouter');
const userRouter = require('./userRouter');
const apiRouter = require('./apiRouter');
const userListsRouter = require('./userListsRouter');

const router = Router();

router.use('/v1', bookRouter, userRouter, userListsRouter, apiRouter);

router.use(() => {
    throw new ApiError('Endpoint not found', { statusCode: 404 });
});

router.use((err, _, response, next) => {
    handleError(err, response, next);
});

module.exports = router;
