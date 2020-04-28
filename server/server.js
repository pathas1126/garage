const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const bodyParser = require("body-parser");

const router = require("./route");

app.use("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}/`);
});
