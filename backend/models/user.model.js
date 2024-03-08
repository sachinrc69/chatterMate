const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: { type: String, default: "" },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
