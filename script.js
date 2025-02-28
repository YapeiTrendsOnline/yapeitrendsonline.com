// Example: Form submission handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    console.log(formData);
    // Add your form submission handling logic here
});


const socket = io();

const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username;
let room;

// Get the username and room from the user
socket.on('connect', () => {
    username = prompt('Enter your username:');
    room = prompt('Enter the room name:');
    socket.emit('join', { username, room });
});

// Display messages received from the server
socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    chatMessages.appendChild(messageElement);
});

// Send a message to the server when the send button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('message', { username, room, message });
        messageInput.value = '';
    }
});

// Send a message to the server when the enter key is pressed
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const message = messageInput.value.trim();
        if (message !== '') {
            socket.emit('message', { username, room, message });
            messageInput.value = '';
        }
    }
});
