import { useState } from "react";

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    const newMessage = { sender: "user", text: userMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true);
    try {
      // Simulated AI response (replace with real API call)
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const { reply } = await response.json();
      const botMessage = { sender: "bot", text: reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChatbot;
