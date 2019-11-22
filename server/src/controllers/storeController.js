import axios from 'axios';

module.exports = {
  list: async (req, res) => {
    res.status(200).json({
      success: true,
    });
  },
};
