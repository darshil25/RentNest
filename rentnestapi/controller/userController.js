const User = require("../models/User");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const mongoose = require('mongoose');
const { errorResponse, successResponse } = require("../helper/index");
const { any } = require("joi");

const UserModel = mongoose.model('user');

const checkUser = async (req, res, next) => {
  try {
    const accessToken = req.headers.access_token;

    // Verify and decode the access token
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SIGN);

    // Extract the userId from the decoded token
    const userId = decodedToken.userId;

    // Find the user in the database
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user has the access key
    const hasAccessKey = user.accessTokens.includes(accessToken);
    if (!hasAccessKey) {
      throw new Error("Invalid access_token");
    }

    // Clean up expired access tokens
    user.accessTokens = user.accessTokens.filter((token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SIGN);
        return decoded.exp > Date.now() / 1000; // Remove expired tokens
      } catch (err) {
        return false; // Remove tokens with invalid signature or expired
      }
    });

    await user.save();

    // Set the user object in the request for further use
    req.user = Object.assign({}, user)?._doc;

    delete req.user.refreshTokens;
    delete req.user.accessTokens;
    delete req.user.resetToken;
    delete req.user.password;
    delete req.user.__v;

    next();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

const me = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    var firstName = req.body.firstName || ""
    var lastName = req.body.lastName || ""
    var email = req.body.email || ""
    var password = req.body.password || ""
    const exitsemail = await UserModel.findOne({ email });
    if (exitsemail) {
      return errorResponse(res, "Email Already Exist.");
    }

    const addUser = new UserModel({
      firstName,
      lastName,
      email,
      password: md5(password)
    });

    await addUser.save();
    const user = await UserModel.findOne({ email });
    const data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }

    return successResponse(res, "User Register successfully", data);
  } catch (err) {
    console.log(err);
    return errorResponse(res, err);
  }
};

const signIn = async (req, res) => {
  try {
    var email = req.body.email || ""
    var password = req.body.password || ""

    const user = await UserModel.findOne({ email });

    if (!user) {
      return errorResponse(res, "Invalid email.");
    }
    const hashedPassword = md5(password);
    if (hashedPassword !== user.password) {
      return errorResponse(res, "Invalid Password.");
    }
    var data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
    return successResponse(res, "Login Successful", data);
  } catch (err) {
    console.log(err);
    return errorResponse(res, "Something Went Wrong")
  }
};



module.exports = {
  me,
  checkUser,
  register,
  signIn
};
