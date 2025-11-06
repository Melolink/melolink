'use client';

import React, { useState } from 'react';
import { Send, Smile, Search, ArrowLeft } from 'lucide-react';

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  const emojis = ['😀', '😂', '🥰', '😎', '🔥', '👍', '❤️', '🤔', '🎉', '🙌'];

  const users = [
    { id: '1', name: 'David Habakkuk', avatar: '/images/Melo.png' },
    { id: '2', name: 'Gbemisola', avatar: '/user2.jpg' },
    { id: '3', name: 'Sophie', avatar: '/user3.jpg' },
  ];

  const [chats, setChats] = useState<{
    [key: string]: { id: number; text: string; sender: 'user' | 'bot' }[];
  }>({
    '1': [{ id: 1, text: 'Hey, I am David 👋 and you?', sender: 'bot' }],
    '2': [{ id: 1, text: 'Hi Gbemisola 😄', sender: 'bot' }],
    '3': [{ id: 1, text: 'Hey Sophie!', sender: 'bot' }],
  });

  const handleSend = () => {
    if (!selectedChat || newMessage.trim() === '') return;
    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user' as const,
    };
    setChats((prevChats) => ({
      ...prevChats,
      [selectedChat]: [...(prevChats[selectedChat] || []), message],
    }));
    setNewMessage('');
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const currentChat = selectedChat ? chats[selectedChat] || [] : [];

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#7B2FFC] via-[#C55FFC] to-[#FFB347]">
      {/* SIDEBAR */}
      <aside
        className={`flex flex-col w-full sm:w-72 bg-white/90 backdrop-blur-md border-r shadow-md transition-all duration-300 ${
          selectedChat ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#7B2FFC] via-[#C55FFC] to-[#FFB347] text-white">
          <div className="flex items-center gap-2">
            <img
              src="/images/Melo.png"
              alt="Logo"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <h1 className="text-lg font-semibold">Chats</h1>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-700"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedChat(user.id)}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b transition hover:bg-purple-50 ${
                selectedChat === user.id ? 'bg-purple-100' : ''
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full border object-cover"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {chats[user.id]?.at(-1)?.text || 'No messages yet'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CHAT */}
      <main
        className={`flex-1 flex flex-col bg-white/70 backdrop-blur-sm transition-all duration-300 ${
          selectedChat ? 'flex' : 'hidden sm:flex'
        }`}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#7B2FFC] via-[#C55FFC] to-[#FFB347] text-white shadow-md sticky top-0 z-10">
              <button
                onClick={() => setSelectedChat(null)}
                className="sm:hidden p-2 rounded-full hover:bg-white/20 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <img
                src={
                  users.find((u) => u.id === selectedChat)?.avatar ||
                  '/default.jpg'
                }
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">
                  {users.find((u) => u.id === selectedChat)?.name}
                </h3>
                <p className="text-sm text-gray-100">Online</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-white h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)]">
              {currentChat.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user'
                      ? 'justify-end text-right'
                      : 'justify-start text-left'
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-sm p-3 rounded-2xl text-sm break-words ${
                      msg.sender === 'user'
                        ? 'bg-[#7B2FFC] text-white rounded-br-none'
                        : 'bg-gradient-to-r from-[#7B2FFC] via-[#C55FFC] to-[#FFB347] text-white shadow'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Emoji Picker */}
            {showEmojis && (
              <div className="bg-white border-t flex flex-wrap p-2 fixed bottom-20 sm:bottom-[90px] left-0 right-0 z-10 shadow-md justify-center">
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

            {/* Message Input */}
            <div className="p-2 sm:p-4 bg-white/90 border-t flex items-center gap-2 sm:gap-3 sticky bottom-0 backdrop-blur-md">
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
                className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#C55FFC] text-sm sm:text-base bg-white/60"
              />
              <button
                onClick={handleSend}
                className="p-2 sm:p-3 bg-[#C55FFC] hover:bg-[#7B2FFC] text-white rounded-full transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-white text-center p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 drop-shadow-md">
              Select a chat to start messaging
            </h2>
            <p className="text-sm sm:text-base opacity-90">
              Your conversations will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
