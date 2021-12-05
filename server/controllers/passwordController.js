const Password = require("../models/Passwords");
const crypto = require("crypto-js");
const DES_SECRET = require("dotenv").config().parsed.DES_SECRET;
module.exports.addPassword = async (req, res) => {
  const { user_id, title, password } = req.body;
  try {
    const encryptedPassword = await crypto.DES.encrypt(
      password,
      DES_SECRET
    ).toString();
    const newPassword = await Password.create({
      user_id,
      title,
      password: encryptedPassword,
    });
    res.status(200).send("Added New Password");
  } catch (e) {
    console.log(e);
    res.status(401).send("Some Error Occured");
  }
};
module.exports.getPassword = async (req, res) => {
  const { user_id, title } = req.query;
  // console.log(req.query);
  try {
    const password = await Password.findOne({
      user_id,
      title,
    });
    password.password = crypto.DES.decrypt(
      password.password,
      DES_SECRET
    ).toString(crypto.enc.Utf8);
    res.status(200).send(password);
  } catch (e) {
    console.log(e);
    res.status(400).send("Some Error Occured");
  }
};
module.exports.getIds = async (req, res) => {
  const { user_id } = req.query;

  try {
    const passwords = await Password.find(
      {
        user_id,
      },
      {
        _id: 0,
        password: 0,
        user_id: 0,
        // __v: 0,
      }
    );
    res.status(200).send(passwords);
  } catch (e) {
    res.status(404).send("Some Error Occured");
  }
};
