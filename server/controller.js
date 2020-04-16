const model = require("./model");

module.exports = {
  api: {},
  sales: {
    items: (req, res) => {
      model.sales.items((result) => {
        if (result) {
          res.send(result);
        }
      });
    },
    detail: (req, res) => {
      const { item_Id } = req.body;
      model.sales.detail(item_Id, (result) => {
        if (result) res.send(result);
      });
    },
  },
};
