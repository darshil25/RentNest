const mongoose = require("mongoose");

function updateDate(next) {
  this.updatedDate = new Date();
  next();
}

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: null }
  },
  { collection: 'user' }
);
userSchema.pre('save', updateDate);
const user = mongoose.model("user", userSchema);



module.exports = { user };