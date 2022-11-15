'use strict'

const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http')
require('dotenv').config();
const PORT=3000;
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use(cors());
app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
    res.send(users);
})

//recieve the client's username
app.post('/username', (req, res) => {
    console.log(req.body.username)
    // console.log(req.query.username)
    res.send('Your username has been received')
})

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)
    socket.on('joinRoom', roomId => {
        users[socket.id]=roomId;
        console.log(`The user with Id ${socket.id} joined room ${roomId}`);
        socket.join(roomId);
        console.log(`Users inside the room ${roomId}`,users)
     })

     socket.on('sendMessage', (data)=>{
        socket.to(data.roomId).emit('receiveMessage', data)
        console.log(data)
     });

    socket.on('disconnect', () => {
        console.log(`🔥: A user disconnected`, socket.id);
    });
})

 

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})