import React from "react";

import { useNavigate } from "react-router-dom";


function ChatBody({ userMessages }) {
     const navigation = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigation('/');
        window.location.reload();
    }
    return (
        <>
            <header className="chat-header" >
                <p> Chat with Colleagues</p>
                <button onClick={handleLeaveChat}> Leave Chat</button>
            </header>

            <div className="message__container">
                {/* {console.log(userMessages)} */}
                {userMessages.map((message) =>
                    message.name === localStorage.getItem('userName') ? (
                       <div className="message__chats" key={message.id}>
                            <p className="sender__name">You</p>
                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                            
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.name}</p>
                            <div className="message__recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                )}

                <div className="message__status">
                    <p>Someone is typing...</p>
                </div>
            </div>
        </>
    );
}

export default ChatBody;