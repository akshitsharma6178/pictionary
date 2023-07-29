const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server,{
  cors: { origin: "http://127.0.0.1:5173" },
});
const wordBank = ["apple", "bananna", "orange"];
let counter = 0;

const onlineUsers = new Set();
let drawerSocketId = null;


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('draw', (data) => {
    console.log('draw');
    console.log(data);
    socket.broadcast.emit('draw', data);
  });

  socket.on("msg", (data) => {
    console.log(data);
    io.emit("msg", data.text);
  });
  socket.on("guess_word", (data) => {
    if (data.msg === wordBank[counter % wordBank.length]) {
      io.emit("new_msg", {
        from: "Server",
        msg: `${socket.id} guessed the word!`,
      });
      counter += 1;
    } else {
      console.log("sent");
      io.emit("new_msg", data);
    }
  });
});


const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
