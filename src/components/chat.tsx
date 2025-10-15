"use client";
import React, { useState } from "react";
import { Send, Smile, Search, Menu } from "lucide-react";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const emojis = ["😀", "😂", "🥰", "😎", "🔥", "👍", "❤️", "🤔", "🎉", "🙌"];

  const users = [
    { id: "1", name: "David Habakkuk", avatar: "/user1.jpg" },
    { id: "2", name: "Gbemisola", avatar: "/user2.jpg" },
    { id: "3", name: "Sophie", avatar: "/user3.jpg" },
  ];

  const [chats, setChats] = useState<{
    [key: string]: { id: number; text: string; sender: "user" | "bot" }[];
  }>({
    "1": [{ id: 1, text: "Hey David 👋", sender: "bot" }],
    "2": [{ id: 1, text: "Hi Gbemisola 😄", sender: "bot" }],
    "3": [{ id: 1, text: "Hey Sophie!", sender: "bot" }],
  });

  const handleSend = () => {
    if (!selectedChat || newMessage.trim() === "") return;
    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "user" as const,
    };
    setChats((prevChats) => ({
      ...prevChats,
      [selectedChat]: [...(prevChats[selectedChat] || []), message],
    }));
    setNewMessage("");
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const currentChat = selectedChat ? chats[selectedChat] || [] : [];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-white border-r shadow-sm flex flex-col transition-transform duration-300 z-20 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-green-600">Chats</h1>
          
          <button
            onClick={() => setMobileMenu(false)}
            className="lg:hidden text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Search bar */}
        <div className="p-3">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none px-2 text-sm"
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedChat(user.id);
                setMobileMenu(false);
              }}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b hover:bg-green-50 transition ${
                selectedChat === user.id ? "bg-green-100" : ""
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {chats[user.id]?.at(-1)?.text || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        {selectedChat ? (
          <>
            <div className="flex items-center gap-3 p-4 bg-white border-b shadow-sm">
              <button
                onClick={() => setMobileMenu(true)}
                className="lg:hidden text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <img
                src={
                  users.find((u) => u.id === selectedChat)?.avatar ||
                  "/default.jpg"
                }
                alt="avatar"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {users.find((u) => u.id === selectedChat)?.name}
                </h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {currentChat.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end text-right"
                      : "justify-start text-left"
                  }`}
                >
                  <div
                    className={`max-w-sm p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Emoji Picker */}
            {showEmojis && (
              <div className="bg-white border-t flex flex-wrap p-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl m-1 hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t flex items-center gap-3">
              <button
                onClick={() => setShowEmojis(!showEmojis)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Smile className="w-6 h-6 text-gray-600" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
            <h2 className="text-xl font-semibold mb-2">
              Select a chat to start messaging
            </h2>
            <p className="text-sm">Your messages will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
