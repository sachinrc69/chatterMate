const generateError = require("../middleware/generateError");
const Conversation = require("../models/conversation.model");

module.exports.newGroupController = async (req, res, next) => {
  try {
    const senderId = req.userId;
    const receiverId = req.body.receiverId;
    const groupName = req.body.groupName;

    let conversation = await Conversation.findOne({ groupName: groupName });
    if (conversation) {
      console.log(conversation);
      throw generateError("Choose a diffrent Name", 404);
    } else {
      conversation = await Conversation.create({
        groupName: groupName,
        participants: [...receiverId, senderId],
      });
      if (!conversation) generateError("Failed to create group", 500);
      else {
        console.log(conversation);
        res.status(200).json({ conversation });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getGroupsController = async (req, res, next) => {
  try {
    const groups = await Conversation.find({ groupName: { $ne: "" } });
    if (!groups) throw generateError("Internal server Error", 500);
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports.getGroupController = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const group = await Conversation.find({ _id: groupId }).populate(
      "participants"
    );
    if (!group) throw generateError("Internal server Error", 500);
    res.status(200).json(group[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
