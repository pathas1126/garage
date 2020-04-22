const firestore = require("./firebase");
const fs = require("fs");

module.exports = {
  api: {},
  // 상품 페이지 API
  sales: {
    items: (page, callback) => {
      firestore
        .collection("items")
        .get()
        .then((docs) => {
          const data = [];
          docs.forEach((doc, i) => {
            data.push(doc.data());
          });
          data.sort((a, b) => {
            return b.item_Number - a.item_Number;
          });
          const resArr = data.slice((page - 1) * 10, page * 10);
          const maxPage = Math.ceil(data.length / 10);
          callback({ resArr, maxPage });
        })
        .catch((err) => {
          throw err;
        });
    },
    // 상세 페이지
    detail: {
      item: (item_Id, callback) => {
        firestore
          .collection("items")
          .where("item_Number", "==", Number(item_Id))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 1) {
              return callback(false);
            }
            querySnapshot.forEach((doc) => {
              const resData = doc.data();
              callback(resData);
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      remove: (data, callback) => {
        firestore
          .collection("items")
          .where("item_Number", "==", data)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // 데이터에 포함된 이미지 파일 삭제
              const { item_Picture } = doc.data();
              console.log(item_Picture);
              if (item_Picture) {
                fs.unlink(`public/${item_Picture}`, (err) => {
                  if (err) throw err;
                  console.log(`item_Picture was deleted`);
                });
              }
              // DB에 있는 다큐먼트 삭제
              doc.ref.delete();

              callback(true);
            });
          })
          .catch((err) => {
            callback(false);
            throw err;
          });
      },
      update: (data, callback) => {
        const { item_Number } = data;
        firestore
          .collection("items")
          .where("item_Number", "==", item_Number)
          .get()
          .then((querySnapshot) =>
            querySnapshot.forEach((doc) => {
              // 수정 요청된 이미지 주소와 DB의 이미지 주소가 다르다면 로컬 이미지 삭제
              if (data.item_Picture !== doc.data().item_Picture) {
                fs.unlink(`public/${doc.data().item_Picture}`, (err) => {
                  if (err) throw err;
                  console.log(`item_Picture was deleted`);
                });
              }
              doc.ref.set({ ...data });
              callback(true);
            })
          )
          .catch((err) => {
            throw err;
          });
      },
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
            const { user_Id, user_Name, user_Password } = doc.data();
            if (user_Password !== user_Password_FF) {
              return callback({
                success: false,
                msg: "비밀번호를 확인해 주세요.",
              });
            }
            if (user_Id === user_Id_FF && user_Password === user_Password_FF) {
              return callback({ success: true, user_Id, user_Name });
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
    user: (data, callback) => {
      firestore
        .collection("users")
        .where("user_Id", "==", data)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              callback(userData);
            });
          } else {
            callback(false);
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    myposts: (data, callback) => {
      firestore
        .collection("items")
        .where("user_Id", "==", data)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            const posts = [];
            querySnapshot.forEach((doc) => posts.push(doc.data()));
            const resPosts = posts
              .sort((a, b) => {
                return b.item_Number - a.item_Number;
              })
              .slice(0, 8);
            callback(resPosts);
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    withdrawal: (data, callback) => {
      firestore
        .collection("users")
        .where("user_Id", "==", data)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              return callback(true);
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
