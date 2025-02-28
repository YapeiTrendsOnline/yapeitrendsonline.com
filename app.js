const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');

mongoose.connect('mongodb://localhost/chat-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routes/users');
const sockets = require('./sockets');

app.use('/users', usersRouter);

server.listen(3000, () => {
    console.log('Server started on port 3000');
});

io.on('connection', (socket) => {
    sockets(io, socket);
});

