import express from 'express';
const router = express.Router();
// const passport = require('passport');
// const authCheck = passport.authenticate('jwt', { session: false });

const storeController = require('../../controllers/storeController');

/**
 * @route  POST api/store/list
 * @desc   store list
 * @access Public
 */
router.route('/list').post(storeController.list);

module.exports = router;
