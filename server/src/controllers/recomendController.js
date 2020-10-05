import storeModel from '../models/storeModel';
import recomendModel from '../models/recomendModel';

module.exports = {
  delReco: (req, res) => {
    // await recomendModel.find({});
    res.status(200).json({
      data: req.body.store_id,
      errors: {},
    });
  },
};
