const socket = io('ws://localhost:3500')

const userMsgForm = document.querySelector('.user-msg-form')
const userMsgField = document.querySelector('.user-msg-field')
const userMsgSubmit = document.querySelector('.user-msg-submit')
const msgList = document.querySelector('.msg-list')

function sendMessage(e) {
  e.preventDefault()

  if(userMsgField.value) {
    // send msg/data
    socket.emit('message', userMsgField.value)
    userMsgField.value = ''
  }

  // userMsgField.focus();
}

userMsgForm.addEventListener('submit', sendMessage);

// recieve/listen for messages
socket.on('message', response => {
  console.log(response)

  const li = document.createElement('li')
  li.textContent = `${response}`
  
  msgList.appendChild(li)
})