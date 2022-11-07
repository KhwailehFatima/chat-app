'use strict'

const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http').Server(app);
require('dotenv');
const PORT=3000;
const socketIO = require('socket.io')(http, {
    cors: {
        origin: `http://localhost:${PORT}`
    }
});

app.use(cors());
app.use(express.json());

let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)
    socket.on('message', data => {
        socketIO.emit('messageResponse', data)
    })
    
     
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter(user => user.socketID !== socket.id);
         socket.disconnect();
    });
})

app.get('/chat', (req, res) => {
    console.log({ message: "Hello" })
    res.json("hello")
});
http.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})