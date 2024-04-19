const mongoose = require("mongoose");

const converstaionSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    groupName: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", converstaionSchema);
