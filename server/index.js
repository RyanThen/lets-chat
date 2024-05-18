import { createServer } from 'http'
import { Server } from 'socket.io'


const httpServer = createServer()
const io = new Server(httpServer, {
  cors: process.env.NODE_ENV === 'production' ? false : "*"
})

io.on('connection', socket => {
  socket.on('message', data => {
    console.log(data)
    // emit message to everyone connected to server
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
  })
})

httpServer.listen(3500, () => {
  console.log('listening of port 3500')
})