const socket = io('ws://localhost:3500')

const userMsgForm = document.querySelector('.user-msg-form')
const userMsgField = document.querySelector('.user-msg-field')
const userMsgSubmit = document.querySelector('.user-msg-submit')
const msgList = document.querySelector('.msg-list')
const activity = document.querySelector('.activity')

function sendMessage(e) {
  e.preventDefault()

  if(userMsgField.value) {
    // send msg/data
    socket.emit('message', userMsgField.value)
    userMsgField.value = ''
  }
}

userMsgForm.addEventListener('submit', sendMessage);

// recieve/listen for messages
socket.on('message', response => {
  activity.textContent = ''

  const li = document.createElement('li')
  li.classList.add('msg-list-item')
  li.textContent = `${response}`
  
  msgList.appendChild(li)
})

userMsgField.addEventListener('keypress', () => {
  socket.emit('activity', socket.id.substring(0, 5))
})

let activityTimer
socket.on('activity', name => {
  activity.textContent = `${name} is typing...`

  clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
      activity.textContent = ''
    }, 2000)
})