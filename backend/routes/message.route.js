const express = require("express");
const isAuth = require("../middleware/isAuth");
const multer = require("multer");
const path = require("path");
const {
  sendMessageController,
  getMessagesController,
  getGroupMessagesController,
  sendGroupMessageController,
  sendImageController,
} = require("../controllers/message.controller.js");
const router = express.Router();
const imagesPath = path.join(__dirname, "../../frontend/src/images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/send/:userId", isAuth, sendMessageController);
router.post(
  "/send/image/:userId",
  isAuth,
  upload.single("image"),
  sendImageController
);
router.post("/send/group/:userId", isAuth, sendGroupMessageController);
router.get("/:userId", isAuth, getMessagesController);
router.get("/group/:userId", isAuth, getGroupMessagesController);

module.exports = router;
