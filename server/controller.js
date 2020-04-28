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
    item: (req, res) => {
      let { searchType, keyword } = req.query;
      switch (searchType) {
        case "n":
          searchType = "item_Name";
          break;
        case "s":
          searchType = "item_Writer";
          break;
        case "m":
          searchType = "item_Sort";
          break;
        default:
          return null;
      }
      model.sales.item({ searchType, keyword }, (result) => {
        if (result) res.send(result);
      });
    },
    reply: {
      write: (req, res) => {
        model.sales.reply.write(req.body, (result) => {
          if (result) res.send(result);
        });
      },
      delete: (req, res) => {
        const { id } = req.params;
        model.sales.reply.delete(id, (result) => {
          if (result) res.send(result);
        });
      },
      update: (req, res) => {
        const data = req.body;
        model.sales.reply.update(data, (result) => {
          if (result) res.send(result);
        });
      },
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
      console.log(req.body);
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
    user: (req, res) => {
      const { user_Id_logon } = req.body;
      model.users.user(user_Id_logon, (result) => {
        if (result) res.send(result);
      });
    },
    myposts: (req, res) => {
      const { id } = req.query;
      model.users.myposts(id, (result) => {
        if (result) res.send(result);
      });
    },
    withdrawal: (req, res) => {
      const { user_Id } = req.body;
      model.users.withdrawal(user_Id, (result) => {
        if (result) res.send(result);
      });
    },
  },
  notice: {
    write: (req, res) => {
      const data = req.body;
      model.notice.write(data, (result) => {
        if (result) res.send(result);
      });
    },
    get: (req, res) => {
      const { page } = req.query;
      model.notice.get(page, (result) => {
        if (result) res.send(result);
      });
    },
    readcount: (req, res) => {
      const { notice_Readcount, notice_Number } = req.body;
      model.notice.readcount({ notice_Readcount, notice_Number }, (result) => {
        if (result) res.send(result);
      });
    },
    detail: (req, res) => {
      const { id } = req.params;
      model.notice.detail(id, (result) => {
        if (result) res.send(result);
      });
    },
    update: (req, res) => {
      const noticeData = req.body;
      model.notice.update(noticeData, (result) => {
        if (result) res.send(result);
      });
    },
    delete: (req, res) => {
      const { notice_Number } = req.body;
      model.notice.delete(notice_Number, (result) => {
        if (result) res.send(result);
      });
    },
  },
  qna: {
    write: (req, res) => {
      const data = req.body;
      model.qna.write(data, (result) => {
        if (result) res.send(result);
      });
    },
    list: (req, res) => {
      const data = req.query;
      model.qna.list(data, (result) => {
        if (result) res.send(result);
      });
    },
    delete: (req, res) => {
      const { qna_Number } = req.body;
      model.qna.delete(qna_Number, (result) => {
        if (result) res.send(result);
      });
    },
    update: (req, res) => {
      const { id } = req.params;
      const data = req.body;
      model.qna.update({ id, data }, (result) => {
        if (result) res.send(result);
      });
    },
    reply: {
      write: (req, res) => {
        const { qna_Number } = req.params;
        const qna_Reply_Data = req.body;
        model.qna.reply.write({ qna_Number, qna_Reply_Data }, (result) => {
          if (result) res.send(result);
        });
      },
      list: (req, res) => {
        const { qna_Number } = req.params;
        console.log(qna_Number);
        model.qna.reply.list(qna_Number, (result) => {
          if (result) res.send(result);
        });
      },
      delete: (req, res) => {
        const { qna_Rnumber } = req.params;
        model.qna.reply.delete(qna_Rnumber, (result) => {
          if (result) res.send(result);
        });
      },
    },
  },
};
