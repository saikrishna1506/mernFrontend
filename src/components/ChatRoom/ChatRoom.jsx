import React from "react";
import useChat from "../../useChat";
import "./chat.css";
import { useParams } from 'react-router-dom';
const ChatRoom = (props) => {
  // const { roomId } = props.match.params;
  const { roomId } = useParams();
console.log(roomId)
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    // console.log(newMessage)
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <div className="room-id">Room id : {roomId}</div>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {/* {console.log(message.ownedByCurrentUser)} */}
              {message.body}
              {/* {console.log(message.body)} */}
            </li>
          ))}

          {/* <li>heool</li> */}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Enter New Message..."
        className="new-message-input-field"
      ></textarea>
      <button onClick={handleSendMessage} className="send-message-button">
        send
      </button>
    </div>
  );
};

export default ChatRoom;

// // //UPDATED WITH NEW CODE OF USERS LISTimport React, { useState, useEffect, useRef } from "react";
// import useChat from "../../useChat";
// import "./chat.css";
// import socketIOClient from 'socket.io-client';
// import { useLocation } from "react-router-dom";
// import { useState,useRef,useEffect } from "react";
// const SOCKET_SERVER_URL="http://localhost:4000"
// const ChatRoom = (props) => {
//   const { search } = useLocation();
//   const username = new URLSearchParams(search).get("username");

//   const { roomId } = props.match.params;
//   const { messages, sendMessage } = useChat(roomId);
//   const [newMessage, setNewMessage] = useState([]);
//   const [users, setUsers] = useState([]);

//   const handleNewMessageChange = (event) => {
//     setNewMessage(event.target.value);
//   };

//   const handleSendMessage = () => {
//     sendMessage(newMessage);
//     setNewMessage("");
//   };

//   const socketRef = useRef();

//   useEffect(() => {
//     socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
//       query: { roomId }
//     });

//     socketRef.current.on("userList", (userList) => {
//       setUsers(userList);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };

//   }, [roomId]);

//   return (
//     <div className="chat-room-container">
//       <div className="room-id">Room id: {roomId}</div>
//       <div className="users-list">
//         <h3>Users in the Room:</h3>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>{user.username}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="messages-container">
//         <ol className="messages-list">
//           {messages.map((message, i) => (
//             <li
//               key={i}
//               className={`message-item ${
//                 message.sender === username ? "my-message" : "received-message"
//               }`}
//             >
//               {message.sender}: {message.body}
//             </li>
//           ))}
//         </ol>
//       </div>
//       <textarea
//         value={newMessage}
//         onChange={handleNewMessageChange}
//         placeholder="Enter New Message..."
//         className="new-message-input-field"
//       ></textarea>
//       <button onClick={handleSendMessage} className="send-message-button">
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatRoom;
