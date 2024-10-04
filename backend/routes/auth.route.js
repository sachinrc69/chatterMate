const express = require("express");
const { login, signup, logout } = require("../controllers/auth.controller");
const { body } = require("express-validator");

const router = express.Router();

console.log("Hit request");

router.post("/login", login);
router.post(
  "/signup",
  [
    body("password").trim().isLength({ min: 6 }),
    body("confirmPassword").trim().isLength({ min: 6 }),
  ],
  signup
);
router.get("/logout", logout);

module.exports = router;
