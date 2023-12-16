const adminModels = require("../models/admin");
const userModels = require("../models/User");
const { errorResponse, successResponse } = require("../helper/index")
const fn = require("../helper/index");
const md5 = require('md5');
const mongoose = require('mongoose');
const Admin = mongoose.model('admin');
const nodemailer = require('nodemailer');



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email == "" || email == null) {
            return errorResponse(res, "Enter Your Email.");
        }
        if (password == "" || password == null) {
            return errorResponse(res, "Enter Your Password.");
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return errorResponse(res, "Invalid email.");
        }
        const hashedPassword = md5(password);
        if (hashedPassword !== admin.password) {
            return errorResponse(res, "Invalid Password.");
        }
        var data = {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        };
        successResponse(res, "Login Successful", data);
    } catch (err) {
        console.log(err);
        errorResponse(res, "Something Went Wrong")
    }
};


module.exports = {
    login
};
