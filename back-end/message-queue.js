const sendMessage = {};

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("joinRoom", (roomId) => {
        users[socket.id] = roomId;
        socket.join(room);
    });
});

io.on("connection", (socket) => {
    if (sendMessage[socket.id]) {
        sendMessage[socket.id].forEach((message) => {
        socket.emit("receiveMessage", message);
        });
        delete sendMessage[socket.id];
    }
    });