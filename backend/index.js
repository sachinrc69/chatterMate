const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const { app, server, io } = require("./socket/socket");
const authRoutes = require("./routes/auth.route.js");
const messageRoutes = require("./routes/message.route");
const userRoutes = require("./routes/user.route");
const groupRoutes = require("./routes/group.route");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/group", groupRoutes);
app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

// app.use(express.static(path.join(dirName, "/frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(dirName, "frontend", "build", "index.html"));
// });

server.listen(PORT, async () => {
  console.log(`connected ${PORT}`);
  await mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(console.log("connected to mongodb"))
    .catch((err) => {
      console.log("connection to mongo failed", err);
    });
});
