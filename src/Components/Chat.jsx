import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { id } = useParams(); // target user ID

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch user and chat
  useEffect(() => {
    if (!userId ||!user) return;

    const fetchData = async () => {
      try {
        const res1 = await axios.get(`${BASE_URL}/chat/${id}`, { withCredentials: true });
        const res2 = await axios.get(`${BASE_URL}/chat/getchat/${id}`, { withCredentials: true });

        const { name, photo } = res1.data;
        setCurrentUser({ name, photo });

        setMessages(res2?.data?.messages || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();

    // Set up socket
    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", {
      fullName: user?.fullName,
      userId,
      id,
    });

    socketRef.current.on("messageReceived", ({ fullName, text, userId: senderId, id }) => {
      setMessages((prev) => [...prev, { fullName, text, senderId, id }]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, user?.fullName, id]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      fullName: user?.fullName,
      userId,
      id,
      text: newMessage,
    });

    setNewMessage("");
  };

  if (!currentUser || !user) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-2">
      <div className="w-full max-w-md h-[600px] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral text-neutral-content">
          <div>
            <h2 className="font-bold text-md">{currentUser.name}</h2>
            <p className="text-sm opacity-70">Online</p>
          </div>
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-white ring-offset-base-100 ring-offset-1">
              <img src={currentUser.photo} alt="user" />
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 bg-base-100 space-y-3">
          {messages.map((message, index) =>
            message?.senderId !== userId ? (
              <div key={index} className="chat chat-start">
                <div className="chat-bubble bg-gray-200 text-black">{message.text}</div>
              </div>
            ) : (
              <div key={index} className="chat chat-end">
                <div className="chat-bubble bg-blue-600 text-white">{message.text}</div>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Box */}
        <div className="p-3 bg-base-100 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered w-full input-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="btn btn-primary btn-sm">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
