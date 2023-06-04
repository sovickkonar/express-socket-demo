var socket = io();
let user_name = prompt("What's your name ?");
console.log(user_name);
const formContainer = document.getElementById('send-container');
const textMessage = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');


socket.emit('new-user-connected',user_name);
appendMessage('You Joined');


socket.on('new-user-joined',(user_name)=>{
    appendMessage(`${user_name} Joined`);
})

socket.on('chat-message-received',({user_name,message})=>{
    appendMessage(`${user_name} : ${message}`)
})

formContainer.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =  textMessage.value;

    appendMessage(`You : ${message}`)

    socket.emit('chat-message-sent',message);
    textMessage.value = '';
})

function appendMessage(message){
    let messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}