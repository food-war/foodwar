import storeModel from '../models/storeModel';

module.exports = {
  delReco: (req, res) => {
    console.log('controller', req.body);
    res.status(200).json({
      data: req.body.store_id,
      errors: {},
    });
  },
};
