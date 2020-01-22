import express from 'express';

const router = express.Router();

const userController = require('../../controllers/userController');
// Use passport
const passport = require('passport');
const authCheck = passport.authenticate('jwt', { session: false });

/**
 * @route  POST api/user/register
 * @desc   user register
 * @access Public
 */
router.route('/register').post(userController.register);

/**
 * @route  POST api/user/checkToken
 * @desc   user checkToken
 * @access Public
 */
router.route('/register/checkToken').post(userController.checkToken);

/**
 * @route  POST api/user/login
 * @desc   user login
 * @access Public 
 */

router.route('/login').post(userController.login);
/**
 * @route  POST api/user/login
 * @desc   user login
 * @access Public 
 */

router.route('/social_login').post(userController.socialLogin);

/**
 * @route  GET api/user/current
 * @desc   return current user
 * @access Private
 */
router.route('/current').get(authCheck, userController.current);

module.exports = router;
