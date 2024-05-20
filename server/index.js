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
  socket.on('message', data => {
    console.log(data)
    // emit message to everyone connected to server
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
  })
})