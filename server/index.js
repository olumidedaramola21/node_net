import { createServer } from "http";
import { Server } from "socket.io";

// Creates a server instance
const httpServer = createServer();
// Configuring Socket.io
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});
// Handling Soket connections
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
// Handling Message from clients
  socket.on("message", (data) => {
    console.log(data);
    io.emit('message',`${socket.id.substring(0, 5)}  ${data}`);
  });
});

// starting the http Server
httpServer.listen(3500, () => console.log('listening on port 3500'))
