import axios from 'axios';
import { naverMapsCrawling } from '../naverMaps';

module.exports = {
  list: async (req, res) => {
    const { address } = req.body;
    console.log(address);
    const crawlingResult = await naverMapsCrawling(address);
    res.status(200).json({
      data: crawlingResult,
    });
  },
};
