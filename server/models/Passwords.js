const mongoose = require("mongoose");
const passwordSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Title is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
});
const Passwords = mongoose.model("passwords", passwordSchema);
module.exports = Passwords;
