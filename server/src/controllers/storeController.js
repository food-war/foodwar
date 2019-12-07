import axios from 'axios';
import { naverMapsCrawling } from '../naverMaps';

module.exports = {
  list: async (req, res) => {
    const crawlingResult = await naverMapsCrawling('서울시 강남구 역삼동 맛집');

    console.log(crawlingResult);

    res.status(200).json({
      success: true,
    });
  },
};
