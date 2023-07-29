const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://127.0.0.1:5173" },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("msg", (data) => {
    console.log(data);
    io.emit("msg", data.text);
  });
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
