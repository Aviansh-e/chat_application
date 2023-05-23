//this is our node server
// backend side
// const io = require('socket.io')(8000);
// Require HTTP module (to start server) and Socket.IO
const path = require('path'); 
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);
const PORT = 8000;

server.listen(PORT, () => {
    console.log(`Server is Listening On Port ${PORT}`);
    
});

 
   
const users = {};
io.on("connection", (socket)=>{
    socket.on('new-user-joines', name => {
        console.log("new-user", "name");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('send', message => {
        socket.broadcast.emit('received', { message: message, name: users[socket.id] });
    })
});