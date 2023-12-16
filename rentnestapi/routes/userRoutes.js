const express = require("express");
const bodyParser = require('body-parser');
const userController = require("../controller/userController");
const userValidator = require("../controller/user-validator");
const { checktoken } = require("../middleware/token");
const { errorResponse } = require("../helper/index");

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const message = error.details.map((i) => i.message).join(",");
        console.log("error", message);
        errorResponse(res, message);
    } else {
        next();
    }
};

const router = express.Router();

router.use(bodyParser.json());
router.use(checktoken);
router.post('/register', validate(userValidator.register), userController.register);
router.post('/signIn', validate(userValidator.signIn), userController.signIn);

module.exports = router;