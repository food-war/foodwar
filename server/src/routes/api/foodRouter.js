import express from 'express';
const router = express.Router();
// const passport = require('passport');
// const authCheck = passport.authenticate('jwt', { session: false });

const foodController = require('../../controllers/foodController');

/**
 * @route  POST api/food/list
 * @desc   food list
 * @access Public
 */
router.route('/list').post(foodController.list);

module.exports = router;
