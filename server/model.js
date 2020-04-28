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

    item: (data, callback) => {
      const { searchType, keyword } = data;
      firestore
        .collection("items")
        .where(searchType, "==", keyword)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            const data = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });
            const resArr = data.sort((a, b) => b.item_Number - a.item_Number);
            callback(resArr);
          } else {
            callback([]);
          }
        });
    },
    // 댓글 작성
    reply: {
      write: (data, callback) => {
        firestore.collection("item_reply").add({ ...data });
        callback(true);
      },
      update: (data, callback) => {
        const { item_Rnumber, item_Detail } = data;
        firestore
          .collection("item_reply")
          .where("item_Rnumber", "==", Number(item_Rnumber))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                doc.ref.set({ ...data, item_Detail });
                callback(true);
              });
            } else {
              callback(false);
            }
          });
      },

      delete: (data, callback) => {
        firestore
          .collection("item_reply")
          .where("item_Rnumber", "==", Number(data))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              querySnapshot.forEach((doc) => {
                doc.ref.delete();
                callback(true);
              });
            } else {
              callback(false);
            }
          });
      },
    },
    // 상세 페이지
    detail: {
      item: (item_Id, callback) => {
        const resObj = {
          itemDetail: {},
          itemReply: [],
        };
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
              resObj.itemDetail = resData;
            });
          })
          .catch((err) => {
            throw err;
          });
        firestore
          .collection("item_reply")
          .where("item_Number", "==", Number(item_Id))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              const replyArr = [];
              querySnapshot.forEach((doc) => replyArr.push(doc.data()));
              resObj.itemReply = replyArr;
            }
            callback(resObj);
          });
      },
      remove: (data, callback) => {
        firestore
          .collection("items")
          .where("item_Number", "==", data)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              querySnapshot.forEach((doc) => {
                // 데이터에 포함된 이미지 파일 삭제
                const { item_Picture } = doc.data();
                if (item_Picture) {
                  fs.unlink(`public/${item_Picture}`, (err) => {
                    if (err) throw err;
                    console.log(`item_Picture was deleted`);
                  });
                }
                // DB에 있는 다큐먼트 삭제
                doc.ref.delete();

                // 종속 댓글 삭제
                firestore
                  .collection("item_reply")
                  .where("item_Number", "==", data)
                  .get()
                  .then((querySnapshot) => {
                    if (querySnapshot.size > 0) {
                      querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                      });
                    }
                  });

                callback(true);
              });
            }
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
        .collection("manager")
        .where("manager_Id", "==", user_Id_FF)
        .get()
        .then((querySnapshot) => {
          // 관리자 정보가 없는 경우 유저 정보 조회
          if (querySnapshot.size === 0) {
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
                  if (
                    user_Id === user_Id_FF &&
                    user_Password === user_Password_FF
                  ) {
                    return callback({
                      success: true,
                      user_Id,
                      user_Name,
                      admin: false,
                    });
                  }
                });
              })
              .catch((err) => {
                throw err;
              });
          } else {
            // 관리자 정보 조회
            querySnapshot.forEach((doc) => {
              const { manager_Id, manager_Name } = doc.data();
              return callback({
                success: true,
                user_Id: manager_Id,
                user_Name: manager_Name,
                admin: true,
              });
            });
          }
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
  notice: {
    write: (data, callback) => {
      firestore
        .collection("notice")
        .add({ ...data })
        .catch((err) => {
          throw err;
        });
      callback(true);
    },
    get: (page, callback) => {
      const data = [];
      firestore
        .collection("notice")
        .get()
        .then((docs) => {
          docs.forEach((doc) => data.push(doc.data()));
          const resArr = data
            .sort((a, b) => b.notice_Number - a.notice_Number)
            .slice((page - 1) * 10, (page - 1) * 10 + 10);
          const maxPage = [];
          for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
            maxPage.push(i);
          }
          Math.ceil(data.length / 10);
          callback({ resArr, maxPage });
        })
        .catch((err) => {
          throw err;
        });
    },
    detail: (data, callback) => {
      firestore
        .collection("notice")
        .where("notice_Number", "==", Number(data))
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              callback(doc.data());
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    readcount: (data, callback) => {
      const { notice_Number, notice_Readcount } = data;
      firestore
        .collection("notice")
        .where("notice_Number", "==", notice_Number)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              doc.ref.set({
                ...doc.data(),
                notice_Readcount: notice_Readcount + 1,
              });
              callback(true);
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    update: (noticeData, callback) => {
      const { notice_Number } = noticeData;
      firestore
        .collection("notice")
        .where("notice_Number", "==", notice_Number)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              doc.ref.set(noticeData);
              callback(true);
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    },
    delete: (notice_Number, callback) => {
      firestore
        .collection("notice")
        .where("notice_Number", "==", notice_Number)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0)
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              callback(true);
            });
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  qna: {
    write: (data, callback) => {
      firestore.collection("qna").add({ ...data });
      callback(true);
    },
    list: (data, callback) => {
      const page = Number(data.page);
      const tmpArr = [];
      firestore
        .collection("qna")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            tmpArr.push(doc.data());
          });
          const resArr = tmpArr
            .sort((a, b) => b.qna_Number - a.qna_Number)
            .slice((page - 1) * 10, (page - 1) * 10 + 10);
          const maxPage = Math.ceil(tmpArr.length / 10);
          callback({ resArr, maxPage });
        })
        .catch((err) => {
          throw err;
        });
    },
    delete: (data, callback) => {
      firestore
        .collection("qna")
        .where("qna_Number", "==", Number(data))
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => doc.ref.delete());
            callback(true);
          } else {
            callback(false);
          }
        });
    },
    update: (updateData, callback) => {
      const { id, data } = updateData;
      firestore
        .collection("qna")
        .where("qna_Number", "==", Number(id))
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              doc.ref.set({ ...data });
              callback(true);
            });
          } else {
            callback(false);
          }
        });
    },
    reply: {
      write: (data, callback) => {
        const { qna_Number, qna_Reply_Data } = data;
        firestore
          .collection("qna")
          .where("qna_Number", "==", Number(qna_Number))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              querySnapshot.forEach((doc) => {
                firestore
                  .collection("qna_reply")
                  .add({ ...qna_Reply_Data })
                  .catch((err) => {
                    throw err;
                  });
                callback(true);
              });
            }
          })
          .catch((err) => {
            throw err;
          });
      },
      list: (qna_Number, callback) => {
        firestore
          .collection("qna_reply")
          .where("qna_Number", "==", Number(qna_Number))
          .get()
          .then((querySnapshot) => {
            const tmpArr = [];
            if (querySnapshot.size > 0) {
              querySnapshot.forEach((doc) => {
                tmpArr.push(doc.data());
              });
              const resArr = tmpArr.sort(
                (a, b) => b.qna_Rnumber - a.qna_Rnumber
              );
              callback(resArr);
            } else {
              callback([]);
            }
          })
          .catch((err) => {
            throw err;
          });
      },
      delete: (qna_Rnumber, callback) => {
        firestore
          .collection("qna_reply")
          .where("qna_Rnumber", "==", Number(qna_Rnumber))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              querySnapshot.forEach((doc) => {
                doc.ref.delete();
              });
              callback(true);
            } else {
              callback(false);
            }
          });
      },
    },
  },
};
