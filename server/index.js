import express from "express";
import { Server } from "socket.io";
import path from "path"; //utilities for working with file and directory paths
import { fileURLToPath } from "url";   // converts file URL to path
// Handling file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// setting up the express server and servers static files from public directory
const PORT = process.env.PORT || 3500;
const app = express();
app.use(express.static(path.join(__dirname, "public")));
// starts the server
const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// Configuring Socket.io
const io = new Server(expressServer, {
  // Why is comfiguration important?
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});
// Handling Soket connections
// on Connetion
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  // Upon connection - only to user
  socket.emit("message", "Welcome to Chat App!");
  // Upon connection - to all others
  socket.broadcast.emit("message", `User ${socket.id.substring(0, 5)} connected`)
  // Listening for a message event - on message
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}:  ${data}`); // emits message to all connected users
  });
  // when user disconnets - to all others
  socket.on("disconnect", ()=> {
    socket.broadcast.emit("message", `User ${socket.id.substring(0, 5)} disconnected`)
  })
  // Listen for activity
  socket.on('activity', (name) => {
    socket.broadcast.emit('activity', name)
  })
});


