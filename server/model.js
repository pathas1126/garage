const firestore = require("./firebase");

module.exports = {
  api: {},
  // 상품 페이지 API
  sales: {
    items: (callback) => {
      firestore
        .collection("items")
        .get()
        .then((docs) => {
          const data = [];
          docs.forEach((doc) => data.push(doc.data()));
          callback(data);
        })
        .catch((err) => {
          throw err;
        });
    },
    detail: (item_Id, callback) => {
      firestore
        .collection("items")
        .where("item_Number", "==", Number(item_Id))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            callback(doc.data());
          });
        })
        .catch((err) => {
          throw err;
        });
    },
    write: (data, callback) => {
      firestore.collection("items").add({ ...data });
      callback(true);
    },
  },
  // 로그인 페이지 API
  users: {
    login: (user_Data, callback) => {
      const { user_Id_FF, user_Password_FF } = user_Data;
      firestore
        .collection("users")
        .where("user_Id", "==", user_Id_FF)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            return callback({
              success: false,
              msg: "존재하지 않는 회원입니다.",
            });
          }
          querySnapshot.forEach((doc) => {
            const { user_Id, user_Password } = doc.data();
            if (user_Password !== user_Password_FF) {
              return callback({
                success: false,
                msg: "비밀번호를 확인해 주세요.",
              });
            }
            if (user_Id === user_Id_FF && user_Password === user_Password_FF) {
              return callback({ success: true, user_Id });
            }
          });
        })
        .catch((err) => {
          throw err;
        });
    },
    signup: (data, callback) => {
      firestore.collection("users").add(data);
      callback(true);
    },
  },
};
