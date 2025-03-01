import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        sender: "ai",
        text: `You said: ${userInput}`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleInputChange = (e) => setUserInput(e.target.value);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg max-w-xs ${
              message.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start"
            }`}
          >
            {message.text}
          </motion.div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
