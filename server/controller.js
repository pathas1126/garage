const model = require("./model");

module.exports = {
  api: {},
  // 상품 페이지 API
  sales: {
    items: (req, res) => {
      const { page } = req.query;
      model.sales.items(Number(page), (result) => {
        if (result) {
          res.send(result);
        }
      });
    },
    // 상품 상세 페이지
    detail: {
      item: (req, res) => {
        const { item_Id } = req.params;
        model.sales.detail.item(item_Id, (result) => {
          if (result) {
            res.send(result);
          } else {
            console.log("there is two docs which item_Numbers are same");
            res.status(500).send(result);
          }
        });
      },
      remove: (req, res) => {
        const { item_Number } = req.body;
        model.sales.detail.remove(item_Number, (result) => {
          if (result) res.send(result);
        });
      },
      update: (req, res) => {
        console.log(req.body);
        const data = req.body;
        model.sales.detail.update(data, (result) => {
          if (result) res.send(result);
        });
      },
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
    login: (req, res) => {
      const data = req.body;
      model.users.login(data, (result) => {
        if (result) res.send(result);
      });
    },
    signup: (req, res) => {
      const data = req.body;
      model.users.signup(data, (result) => {
        if (result) res.send(result);
      });
    },
  },
};
