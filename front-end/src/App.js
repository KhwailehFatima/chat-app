
import { useState } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import Login from './components/Login'
import "./App.css";
let Users = [];

const socket = io.connect('http://localhost:3001');

function App() {

  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [chat, setChat] = useState(false);
console.log(socket)
  const roomJoining = () => {
    if (username !== "" && roomId !== "") {
      socket.emit('joinRoom', roomId);
      setChat(true);
    }
  }

  return (
    <div className="App">
      {!chat ? (
        <div className="joinChat">
          <h3 className="h3" >JOIN US!</h3>
          <input className="inputs"
            type="text"
            placeholder="Add your name ...."
            onChange={(event) => {
              setUsername(event.target.value);
              Users.push(event.target.value);
              localStorage.setItem('onlineUsers', Users);

            }}
          />
          <select
            className="inputs"
            onChange={(e) => {
              setRoomId(e.target.value)
            }}>
            <option value="unselected">Select a Channel</option>
            <option value="general">General</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>

          </select>

          <button 
           className="inputs"
          onClick={roomJoining}>Join This Channel</button>
        </div>
      ) : (
        <Login socket={socket} username={username} room={roomId} />
      )}
    </div>
  );
}

export default App;
