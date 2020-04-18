const firestore = require("./firebase");

module.exports = {
  api: {},
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
};
