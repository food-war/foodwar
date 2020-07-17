import storeModel from '../models/storeModel';

module.exports = {
  test: (req, res) => {
    console.log(req.body);
    console.log('싱이이이이발아아ㅏㄹ발ㅇ');
    res.status(200).json({
      data: req.body.store_id,
      errors: {},
    });
  },
};
