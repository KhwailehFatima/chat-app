import React from 'react';
import  '../App.css';
function ChatBar() {
    return (
        <div>
            <h2> Open Chat</h2>
            <div className='chatbar-container'>
                <p>User 1</p>
                <p>User 2</p>
                <p>User 3</p>
                <p>User 4</p>
            </div>
        </div>
    );
}

export default ChatBar;