import express from 'express';
const router = express.Router();

const recommendController = require('../../controllers/recommendController');

console.log(recommendController.test);
router.route('/test').post(recommendController.test);

module.exports = router;
