const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);


const onlineUsers = new Set();
let drawerSocketId = null;


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('draw', (data) => {
    console.log('draw');
    console.log(data);
    socket.broadcast.emit('draw', data);
  });

});

const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
