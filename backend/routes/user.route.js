const express = require("express");
const isAuth = require("../middleware/isAuth");

const {
  allusers,
  chattingWith,
  searchUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", isAuth, allusers);
router.get("/:chattingWithId", isAuth, chattingWith);
router.get("/search/:searchText", isAuth, searchUser);

module.exports = router;
