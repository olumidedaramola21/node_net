const  ws = require("ws")
const server = new ws.Server({port: '3000'})

server.on('connection', socket => {
  socket.on('message', message => {
    // message reads as a buffer
    const b = Buffer.from(message)
    console.log(b.toString())
    // console.log(message)
    socket.send(`${message}`)
  })
})
