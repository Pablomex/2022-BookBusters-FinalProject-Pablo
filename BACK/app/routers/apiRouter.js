const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const { verifyTokenWithoutError } = require('../middlewares/tokenVerifier');

const apiController = require('../controllers/apiController');

router
    .route('/book/isbn/:isbn')
    /**
     * GET /v1/book/isbn/{isbn}
     * @summary Find one book with ISBN in google API
     * @tags SEARCH BOOK API
     * @param {string} isbn.path.required - book ISBN
     * @security BearerAuth
     * @return {Book} 200 - success response - application/json
     */
    .get(
        controllerHandler(verifyTokenWithoutError),
        controllerHandler(apiController.getBookByISBN),
    );

router
    .route('/book/search')
    /**
     * GET /v1/book/search
     * @summary Find books by Keyword
     * @tags SEARCH BOOK API
     * @param {string} q.query
     * @param {number} limit.query
     * @param {number} page.query
     * @security BearerAuth
     * @return {[Book]} 200 - success response - application/json
     */
    .get(
        controllerHandler(verifyTokenWithoutError),
        controllerHandler(apiController.getBookByKeyword),
    );

module.exports = router;
