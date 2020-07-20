import express from 'express';
const router = express.Router();

const recomendController = require('../../controllers/recomendController');
console.log('recomend Router~~');
router.route('/test').post(recomendController.test);

module.exports = router;
