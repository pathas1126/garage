module.exports = {
  api: {
    getData: (req, res) => {
      console.log("컨트롤러 연결");
    },
    addData: (req, res) => {
      console.log(req.body);
    },
  },
};
