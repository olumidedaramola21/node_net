import express from 'express'
import { Server } from "socket.io";
// provides utilities for working with file and directory paths
import path from 'path'
// converts file URL to path
import { fileURLToPath } from 'url';

// full path of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// create port and configuring the express srver
const PORT = process.env.PORT || 3500
const app = express()
app.use(express.static(path.join(__dirname, "public"))) // serves static fikes from the public directory

// starts the server
const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

// Configuring Socket.io
const io = new Server(expressServer, {
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

