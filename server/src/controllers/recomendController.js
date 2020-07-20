import storeModel from '../models/storeModel';

module.exports = {
  test: (req, res) => {
    console.log(req.body);
    res.status(200).json({
      data: req.body.store_id,
      errors: {},
    });
  },
};
