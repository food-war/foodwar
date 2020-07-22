import express from 'express';
const router = express.Router();

const recomendController = require('../../controllers/recomendController');

router.route('/delReco').post(recomendController.delReco);

module.exports = router;
