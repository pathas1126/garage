const model = require("./model");

module.exports = {
  api: {},
  tmp: {
    images: (req, res) => {
      console.log(req.body);
    },
  },
  // 상품 페이지 API
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
    write: (req, res) => {
      const data = req.body;
      model.sales.write(data, (result) => {
        if (result) res.send(result);
      });
    },
  },
  // 로그인 페이지 API
  users: {
    user: (req, res) => {
      const data = req.body;
      model.users.user(data, (result) => {
        if (result) res.send(result);
      });
    },
  },
};
