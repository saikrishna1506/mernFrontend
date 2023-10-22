import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "https://chatbackend-2qo9.onrender.com:4000";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    try {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId }
      });
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketRef.current.id
        };
        setMessages((messages) => [...messages, incomingMessage]);
      });
    } catch (error) {
      console.error("WebSocket connection error:", error);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    }
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id
    });
  };

  return { messages, sendMessage };
};

export default useChat;
