import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()

app.use(express.static(path.join(__dirname)))

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

const io = new Server(expressServer, {
  cors: process.env.NODE_ENV === 'production' ? false : "*"
})

io.on('connection', socket => {

  // upon connection - only to user
  socket.emit('message', 'Welcome to Let\'s Chat!')

  // upon connection - all users except current
  socket.broadcast.emit('message', `${socket.id.substring(0, 5)} has joined the chat`)

  // listen for message event
  socket.on('message', data => {
    console.log(data)
    // emit message to everyone connected to server
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
  })

  // when user disconnects
  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `${socket.id.substring(0, 5)} has left the chat`)
  })

  // listen for activity
  socket.on('activity', (name) => {
    socket.broadcast.emit('activity', `${name}`)
  })
})