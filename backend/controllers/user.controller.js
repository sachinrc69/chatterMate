const generateError = require("../middleware/generateError");
const User = require("../models/user.model");

module.exports.allusers = async (req, res, next) => {
  try {
    const loggedInUser = req.userId;

    const users = await User.find(
      { _id: { $ne: loggedInUser } },
      { password: 0 }
    );
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal sever error" });
  }
};

module.exports.chattingWith = async (req, res, next) => {
  try {
    const chattingWithId = req.params.chattingWithId;
    const user = await User.findOne({ _id: chattingWithId });

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
module.exports.searchUser = async (req, res, next) => {
  try {
    const searchText = req.params.searchText;

    const users = await User.find({ username: searchText });
    console.log(users);
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};
