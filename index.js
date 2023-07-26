const express = require("express");
const app = express();
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const server = require("http").Server(app);

// Middleware
app.use(cors());
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config();
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`run on port ${port}`));

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("recieve-message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
