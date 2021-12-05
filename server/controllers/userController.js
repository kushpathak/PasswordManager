const User = require("../models/User");
const config = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");
const errorHandler = (error) => {
  if (error.errors) {
    var errorObj = {};

    Object.keys(error.errors).forEach((err) => {
      errorObj[error.errors[err].properties.path] =
        error.errors[err].properties.message;
    });
    return errorObj;
  } else if (error.message) {
    if (error.message === "Invalid Password") {
      return {
        password: error.message,
      };
    } else if (error.message === "Invalid User Id") {
      return {
        user_id: error.message,
      };
    } else {
      return {
        user_id: "User Id already used",
      };
    }
  }
};
module.exports.createUser = async (req, res) => {
  const { user_id, password } = req.body;
  try {
    await User.create({
      user_id,
      password,
    });
    res.status(200).send("User Successfully Created");
  } catch (e) {
    res.status(401).send(errorHandler(e));
  }
};
module.exports.loginUser = async (req, res) => {
  const { user_id, password } = req.body;
  try {
    const valid = await User.login(user_id, password);
    const token = jwt.sign({ user_id }, config.JWT_SECRET, {
      expiresIn: 60 * 60 * 2,
    });

    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 2,
      path: "/",
      httpOnly: true,
    });
    res.status(200).send("Logged In");
  } catch (e) {
    res.status(401).send(errorHandler(e));
  }
};
module.exports.getStatus = (req, res) => {
  res.status(200).send("Logged In");
};
module.exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).send("Logged Out Successfully!");
  } catch (e) {
    res.status(401).send("Some Error Occured");
  }
};
