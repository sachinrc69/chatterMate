const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateWebToken = require("../utils/generateWebToken");
const { validationResult } = require("express-validator");
const generateError = require("../middleware/generateError");

module.exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Invalid credentials." });
  }
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    console.log(password, confirmPassword);
    if (password !== confirmPassword) generateError("Password dont match", 404);
    const user = await User.findOne({ username });
    if (user) generateError("user already exists", 404);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    const securePassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      username,
      password: securePassword,
      gender,
      profilePic: profilePic,
    });
    if (newUser) {
      const authToken = generateWebToken(newUser._id, res);
      res.status(200).json({
        message: "signup success",
        authToken: authToken,
        user: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) generateError("Invalid Credentials", 404);
    const loginUser = await User.findOne({ username });
    if (!loginUser) generateError("User does not exist", 404);

    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordMatch) generateError("Incorrect Password", 404);
    const authToken = generateWebToken(loginUser._id, res);

    res.status(200).json({
      message: "login success",
      authToken: authToken,
      user: loginUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.cookie("authToken", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "loged out succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal sever error" });
  }
};
