const socket = new WebSocket('ws://localhost:3000')

const userMsgForm = document.querySelector('.user-msg-form')
const userMsgField = document.querySelector('.user-msg-field')
const userMsgSubmit = document.querySelector('.user-msg-submit')
const msgList = document.querySelector('.msg-list')

function sendMessage(e) {
  e.preventDefault()

  if(userMsgField.value) {
    socket.send(userMsgField.value)
    userMsgField.value = ''
  }

  // userMsgField.focus();
}

userMsgForm.addEventListener('submit', sendMessage);

// listen for messages
socket.addEventListener('message', response => {
  console.log(response)

  const li = document.createElement('li')
  li.textContent = response.data
  
  msgList.appendChild(li)
})