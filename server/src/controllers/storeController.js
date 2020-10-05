import storeModel from '../models/storeModel';
import { naverMapsCrawling } from '../naverMaps';
import { newNaverMapsCrawling } from '../naverMaps/newMaps';
module.exports = {
  list: async (req, res) => {
    const { address, page, limit } = req.body;
    let result;
    let existenceCheck = false;

    /** 넘겨받은 주소로 이미 등록된 식당들이 있는지 체크 */
    await storeModel
      .find({ store_pk_address: address })
      .skip((page - 1) * limit)
      .limit(limit)
      .then(data => {
        if (data && data.length > 0) {
          existenceCheck = true;
          result = {
            result: data,
            error: {},
          };
        }
      });

    /** DB에 없다면 크롤링하여 데이터를 DB에 저장. */
    // if (!existenceCheck) {
    //   result = await naverMapsCrawling(address);
    //   result.result.map(item => {
    //     const newStoreModel = new storeModel({
    //       ...item,
    //       store_pk_address: address,
    //     });
    //     newStoreModel.save();
    //   });
    // }

    //음식점 크롤링 부분 변경
    if (!existenceCheck) {
      result = await newNaverMapsCrawling(address);
      // console.log(result);

      result.result.map(item => {
        const newStoreModel = new storeModel({
          ...item,
          store_pk_address: address,
        });
        newStoreModel.save();
      });
    }

    res.status(200).json({
      data: result,
    });
  },
};
