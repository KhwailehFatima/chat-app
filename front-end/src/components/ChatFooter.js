import React, { useState } from 'react';
 
function ChatFooter({socket}) {
    const [userMessage, setUserMessage] = useState('');
    const handleSendMessage = (e) => {
        e.preventDefault();
        if(userMessage.trimEnd()&& localStorage.getItem('userName')){
            socket.emit('message',{
                text:userMessage,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID:socket.id
            });
        }
        setUserMessage('');
    };
    return (
        <div>
            <form className='form' onSubmit={handleSendMessage} >
                <input
                    type='text'
                    value={userMessage}
                    placeholder="Write your message"
                    onChange={(e) => { setUserMessage(e.target.value) }}
                />
                <button>Send</button>
             
            </form>
        </div>
    );
}

export default ChatFooter;