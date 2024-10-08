"use client";
import React, { useState, useEffect } from "react";
import { ChatInterface } from "./ChatInterface";

// Define Message type
type Message = {
  text: string;
  isSent: boolean; // true if sent, false if received
};

// Define User type for the preview list
type User = {
  name: string;
  lastMessage: string;
  lastSeen: string;
};

const Chat: React.FC = () => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(true); // Default to showing the preview list
  const [chatName, setChatName] = useState<string>("");
  const [lastSeen, setLastSeen] = useState<string>(""); // Store last seen time
  const [countdown, setCountdown] = useState<number>(30);
  const [messages, setMessages] = useState<Message[]>([]);
  const [animate, setAnimate] = useState<boolean>(false);

  // Toggle the animation every 3 seconds
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 3000);

    return () => clearInterval(animationInterval);
  }, []);
  // User preview list
  const [users, setUsers] = useState<User[]>([
    {
      name: "John Doe",
      lastMessage: "Hi! I have a question.",
      lastSeen: "5 mins ago",
    },
    {
      name: "Jane Smith",
      lastMessage: "Can you help me?",
      lastSeen: "10 mins ago",
    },
    {
      name: "Alice Johnson",
      lastMessage: "Looking forward to your reply.",
      lastSeen: "15 mins ago",
    },
  ]);

  useEffect(() => {
    // Disable body scroll when chat or preview is open
    if (showChat) {
      document.body.style.overflow = "hidden"; // Disable background scrolling
    } else {
      document.body.style.overflow = "unset"; // Enable background scrolling
    }

    return () => {
      document.body.style.overflow = "unset"; // Clean up on unmount
    };
  }, [showChat]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showChatInterface = (name: string, lastSeenTime: string) => {
    setChatName(name);
    setLastSeen(lastSeenTime);
    // Simulating fetching messages for the selected user
    setMessages([
      { text: "Hello! How can I help you?", isSent: false },
      { text: "Hi! I have a question about your services.", isSent: true },
    ]);
    setShowPreview(false); // Hide preview when showing chat
  };

  const backToChatList = () => {
    setMessages([]); // Clear messages when going back to the chat list
    setShowPreview(true); // Show preview list again
  };

  const closePreviewList = () => {
    setShowChat(false);
  };

  const sendMessage = (message: Message) => {
    if (message.text.trim()) {
      setMessages((prev) => [...prev, message]); // Add new message to the list
    }
  };

  return (
    <div className={`fixed end-6 bottom-6 group  `}>
      {/* Backdrop */}
      {showChat && <div className="fixed inset-0 bg-black opacity-50 z-30" />}

      {/* Chat Modal */}
      {showChat && !showPreview && (
        <div className="fixed top-0 right-0 h-full flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto z-40 bg-white">
          <div className="bg-green-600 text-white p-4 flex items-center">
            <button className="text-white mr-3" onClick={backToChatList}>
              {/* Back Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="rounded-full w-10 h-10 mr-3"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold">{chatName}</span>
              <span className="text-sm">{lastSeen}</span>
            </div>
          </div>

          {/* Chat Interface */}
          <ChatInterface
            chatName={chatName}
            lastSeen={lastSeen}
            backToChatList={backToChatList}
            countdown={countdown}
            messages={messages} // Pass messages to the ChatInterface
            sendMessage={sendMessage} // Pass sendMessage function
          />
        </div>
      )}

      {/* User Preview List */}
      {showChat && showPreview && (
        <div className="fixed top-0 right-0 h-full flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto z-40 bg-white">
          <div className="bg-gray-200 p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Messages</h2>
            <button onClick={closePreviewList} className="text-red-500">
              ✖
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {users.map((user, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                onClick={() => showChatInterface(user.name, user.lastSeen)}
              >
                <div className="flex justify-between">
                  <div>
                    <span className="font-bold">{user.name}</span>
                    <p className="text-sm">{user.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-500">{user.lastSeen}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Icon */}
      {/* {!showChat && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition duration-200"
            onClick={() => {
              setShowChat(true);
            }} // Example chat name and last seen
          >
            💬
          </button>
        </div>
      )} */}

      {!showChat && (
        <button
          type="button"
          onClick={() => setShowChat(true)}
          className={`flex items-center justify-center text-white bg-gray-600 rounded-full w-14 h-14 hover:bg-gray-700 focus:ring-4 ${
            animate ? "ring-4 ring-gray-300 outline-none" : ""
          } focus:ring-gray-300 focus:outline-none transition-all duration-300`}
        >
          {/* Chat Icon */}
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>

          <span className="sr-only">Open Chat</span>
        </button>
      )}
    </div>
  );
};

// ChatInterface Component
export default Chat;
