import React, { useState, useEffect } from "react";
import { joinWebSocket, sendMessage, onMessage } from "../socketClient";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); 

const ChatComponent = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    joinWebSocket(user);

    onMessage((msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleSendMessage = () => {
    sendMessage({ user, text: message });
    setMessage("");
  };
  
 
    useEffect(() => {
      // Listen for incoming messages
      socket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
  
      return () => {
        socket.off("receiveMessage"); // Clean up on unmount
      };
    }, []);
  
    const sendMessage = () => {
      socket.emit("sendMessage", message); // Send message to the server
      setMessage(""); // Clear the input field
    };
  
    return (
      <div>
        <div>
          {messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  };
  
  return (
    <div>
      <h2>Live Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );

export default ChatComponent;
