const express = require("express");
const router = express.Router();
const admin = require("../controller/adminController");
const { checktoken } = require("../middleware/token.js");

router.use(checktoken);
router.post("/login", admin.login);

module.exports = router;