import React, { useEffect, useState }  from "react";
import  '../App.css';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from "../components/ChatFooter";

 
function ChatPage({socket}) {
    const [userMessages, setUserMessages]=useState([]);
    useEffect(()=>{
        socket.on('messageResponse', (data)=>{
            setUserMessages([...userMessages, data])
        }, [socket, userMessages]);
        // console.log(userMessages)
    })
     return (
        <div>
            <ChatBar socket={socket} />
            <div>
                <ChatBody userMessages={userMessages} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
}

export default ChatPage;