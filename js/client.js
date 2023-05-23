// script src="/socket.io/socket.io.js"></script> 
const socket = io('http://localhost:8000');

// var socket = new io.Socket();

// socket.connect('http://127.0.0.1:8000');
const form = document.getElementById("send-container");
const messageInp = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container")

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=> {
    e.preventDefault();
    const message = messageInp.value;
    append(`you:${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';

})

const namie = prompt("enter your name");
socket.emit("new-user-joines", namie);



socket.on('user-joined', namie => {
    //now i wanted to append it on the left side
    append(`${namie} joined the chat`, 'right');
})
socket.on('received', data => {
    append(`${data.name} : ${data.message}`, 'left');
})