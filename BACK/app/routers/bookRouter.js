const express = require('express');

const router = express.Router();

const controllerHandler = require('../middlewares/controllerWrapperAsync');
const bookController = require('../controllers/bookController');
const { verifyToken, verifyTokenWithoutError } = require('../middlewares/tokenVerifier');

const validate = require('../validator/validator');
const createSchema = require('../validator/schemas/bookCreate');

router
    .route('/book')
    /**
     * GET /v1/book
     * @security BearerAuth
     * @summary Get all books in donation with users, order by last one
     * @tags BOOK
     * @param {number} page.query - access to next 10 books
     * @return {[Book]} 200 - success response - application/json
     */
    .get(
        controllerHandler(verifyTokenWithoutError),
        controllerHandler(bookController.getAllInDonation),
    )
    /**
     * POST /v1/book
     * @summary Add book and relation user_has_book to database or update if already exist
     * @tags BOOK
     * @security BearerAuth
     * @param {InputBook} request.body.required - Book to add information
     * @return {Book} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(
        // validate(createSchema, 'body'),
        controllerHandler(verifyToken),
        controllerHandler(bookController.addBook),
    );

router
    .route('/book/:id(\\d+)')
    /**
     * GET /v1/book/{id}
     * @summary Get one book in donation by id
     * @security BearerAuth
     * @param {number} id.path.required - book identifier
     * @tags BOOK
     * @return {Book} 200 - success response - application/json
     * @return {ApiError} 404 - Id not found
     */
    .get(
        controllerHandler(verifyTokenWithoutError),
        controllerHandler(bookController.getOneBookById),
    );


router
    .route('/book/around-me')
    //  /**
    //  * GET /v1/book/around-me
    //  * @summary Get details books with ids
    //  * @security BearerAuth
    //  * @param {string} books.query ex : [1,2]
    //  * @tags BOOK
    //  * @return {[Book]} 200 - success response - application/json
    //  */
    // .get(controllerHandler(bookController.getBooksWithIds))
    /**
     * POST /v1/book/around-me
     * @summary Add book and relation user_has_book to database or update if already exist
     * @tags BOOK
     * @security BearerAuth
     * @param {InputAroundMe} request.body.required - ex {"location" : "(48.5,2.3)", "radius" : 200}
     * @return {OutputAroundMe} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     */
    .post(
        controllerHandler(verifyTokenWithoutError),
        controllerHandler(bookController.getBooksAroundMe),
    );





module.exports = router;
