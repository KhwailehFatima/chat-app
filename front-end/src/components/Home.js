import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const navigation = useNavigate();
    const [userName, setUserName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        navigation('/chat');

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Chat Application Using Socket.io</h2>
                <label htmlFor='username'>UserName</label>
                <input
                    type='text'
                    minLength={5}
                    value={userName}
                    id='username'
                    name='username'
                    onChange={(e) => setUserName(e.target.value)}
                />

                <button >Sign In </button>
            </form>
        </div>
    );
}

export default Home;