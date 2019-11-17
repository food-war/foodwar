module.exports = {
  list: async (req, res) => {
    const test = req.body;
    console.log(test);
    res.status(200).json(test);
  },
};
