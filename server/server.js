const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const bodyParser = require("body-parser");


const router = require("./route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

app.use(express.static("public"));



app.listen(PORT, () => {
  console.log(`Server on: http://localhos:${PORT}/`);
});
