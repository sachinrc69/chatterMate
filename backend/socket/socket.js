const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const userIdSocketIdMap = {};
const getRecieverSocketId = (recieverID) => {
  return userIdSocketIdMap[recieverID];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userIdSocketIdMap[userId] = socket.id;
    console.log(userIdSocketIdMap);
  }
  io.emit("getUsersOnline", Object.keys(userIdSocketIdMap));
});

io.on("disconnect", (socket) => {
  console.log("a user disconected", socket.id);
  // const userId = socket.handshake.query.userId;
  delete userIdSocketIdMap[userId];
  io.emit("getUsersOnline", Object.keys(userIdSocketIdMap));
});

module.exports = { app, io, server, getRecieverSocketId };
