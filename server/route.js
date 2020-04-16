const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/sales/items", controller.sales.items);

router.post("/sales/detail", controller.sales.detail);

module.exports = router;
