const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const generateError = require("../middleware/generateError");
const { getRecieverSocketId, io } = require("../socket/socket");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

module.exports.sendImageController = async (req, res, next) => {
  try {
    const message = req.body.message;
    const receiverId = req.params.userId;
    const senderId = req.userId;
    const img = req.file.filename;

    let conversation = await Conversation.findOne({
      $and: [
        { participants: { $in: [senderId] } },
        { participants: { $in: [receiverId] } },
        { participants: { $size: 2 } },
      ],
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      if (!conversation) throw generateError("Internal server error", 500);
    }

    const newMessage = new Message({ senderId, receiverId, img });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      res.status(200).json({ newMessage: newMessage });
    }
    Promise.all([newMessage.save(), conversation.save()]);
    const recieverSocketId = getRecieverSocketId(receiverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports.sendMessageController = async (req, res, next) => {
  try {
    const message = req.body.message;
    const receiverId = req.params.userId;
    const senderId = req.userId;
    const img = req.body.img;
    console.log(img);

    let conversation = await Conversation.findOne({
      $and: [
        { participants: { $in: [senderId] } },
        { participants: { $in: [receiverId] } },
        { participants: { $size: 2 } },
      ],
    });
    console.log(senderId, receiverId);
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      if (!conversation) throw generateError("Internal server error", 500);
    }

    const newMessage = new Message({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      res.status(200).json({ newMessage: newMessage });
    }
    Promise.all([newMessage.save(), conversation.save()]);

    const recieverSocketId = getRecieverSocketId(receiverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports.sendGroupMessageController = async (req, res, next) => {
  try {
    const message = req.body.message;
    const receiverId = req.params.userId;
    const senderId = req.userId;

    let conversation = await Conversation.findOne({ _id: receiverId });

    const newMessage = new Message({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      res.status(200).json({ newMessage: newMessage });
    }
    Promise.all([newMessage.save(), conversation.save()]);

    let participants = await conversation.participants;

    console.log(participants);
    const senderScoketId = getRecieverSocketId(senderId);
    participants.forEach((element) => {
      const recieverSocketId = getRecieverSocketId(element);
      if (recieverSocketId) {
        io.except(senderScoketId)
          .to(recieverSocketId)
          .emit("newMessage", newMessage);
      }
    });

    // const recieverSocketId = getRecieverSocketId(receiverId);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("newMessage", newMessage);
    // }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getMessagesController = async (req, res, next) => {
  try {
    const receiverId = req.params.userId;
    const senderId = req.userId;

    const conversation = await Conversation.findOne({
      $and: [
        { participants: { $in: [senderId] } },
        { participants: { $in: [receiverId] } },
        { participants: { $size: 2 } },
      ],
    }).populate("messages");
    if (!conversation) res.status(200).json([]);
    else res.status(200).json(conversation.messages);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
module.exports.getGroupMessagesController = async (req, res, next) => {
  try {
    const receiverId = req.params.userId;
    const senderId = req.userId;

    const conversation = await Conversation.findOne({
      _id: receiverId,
    }).populate("messages");

    if (!conversation) res.status(200).json([]);
    res.status(200).json(conversation.messages);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
