import axios from "axios";
import React, { useEffect, useState } from "react";

function Login({ socket, username, roomId }) {

    const [sentMessage, setSentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (sentMessage !== "") {
            const messageData = {
                roomId: roomId,
                author: username,
                message: sentMessage
            };
            console.log(messageData)
            await socket.emit("sendMessage", messageData);
            setMessages((allMessages) => [...allMessages, messageData]);
            setSentMessage("");
        }
    };


    const getAllUsers = async () => {
        const allUsers = await axios.get("http://localhost:3001/users");
        const allUsersFromLS = localStorage.getItem('onlineUsers');
        console.log(allUsersFromLS, 'ls')
        console.log(allUsers.data);
        console.log(username)
    };


    const leaveChannel = async () => {
        window.location.reload();
    }
    useEffect( () => {
        socket.on( 'connection', () => {
            socket.emit('join', {roomId: parseInt(localStorage.getItem('roomId'))});
            console.log( 'connected' );
            socket.emit('sendMessage', {roomId: parseInt(localStorage.getItem('roomId'))});
            socket.on('sendMessage', (data) => {
                setMessages(data);
            });
        } );
        socket.on( 'disconnect', () => {
            console.log( 'disconnected' );
        } );
    }, [socket] );

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            setMessages((allMessages) => [...allMessages, data]);
        });
    }, [socket]);

    return (
        <div className="chat-container">
            <div className="users-list">
                <button 
                 className="inputs"
                onClick={getAllUsers}> Show </button>

                <button
                 className="inputs"
                onClick={leaveChannel} > Leave </button>


            </div>
            <div className="chat-window">
                <div className="chat-header">
                    <p>Chat with your friends </p>
                </div>
                <div className="chat-body">
                    {messages.map((content) => {
                        return (
                            <div
                                className="message"
                                id={username === content.author ? "you" : "other"}
                            >
                                <div>

                                    <div className="sent-message">
                                        <p id="message-element">{content.author}: {content.message}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="chat-footer">
                    <input
                     className="inputs"
                        type="text"
                        value={sentMessage}
                        placeholder="Message"
                        onChange={(event) => {
                            setSentMessage(event.target.value);
                            console.log(event.target.value)
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button 
                     className="inputs"
                    onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Login;