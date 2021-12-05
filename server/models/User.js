const mongoose = require("mongoose");
const crypto = require("crypto-js");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User Id is required"],
    unique: [true, "User Id already used"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be atleat 6 characters long"],
  },
});
userSchema.pre("save", function (next) {
  var cipherText = crypto.AES.encrypt(
    this.password,
    process.env.AES_SECRET
  ).toString();
  this.password = cipherText;
  next();
});
userSchema.statics.login = async function (user_id, password) {
  const user = await this.findOne({
    user_id,
  });
  if (!user) {
    throw new Error("Invalid User Id");
  } else {
    var decryptedPassword = crypto.AES.decrypt(
      user.password,
      process.env.AES_SECRET
    ).toString(crypto.enc.Utf8);
    if (decryptedPassword !== password) {
      throw new Error("Invalid Password");
    }
  }
};
const User = mongoose.model("user", userSchema);
module.exports = User;
