const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const {
  newGroupController,
  getGroupsController,
  getGroupController,
} = require("../controllers/group.controller");

router.post("/newGroup", isAuth, newGroupController);
router.get("/allGroups", isAuth, getGroupsController);
router.get("/:groupId", isAuth, getGroupController);

module.exports = router;
