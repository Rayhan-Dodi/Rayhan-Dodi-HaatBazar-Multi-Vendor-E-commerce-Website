import React, { useState } from 'react';
import { Mic, Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript);
    };

    recognition.onerror = (err) => {
      console.error('Voice recognition error:', err);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-grow px-4 py-2 text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500"
      >
        <Search size={20} />
      </button>
      <button
        onClick={startVoiceRecognition}
        className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'} hover:bg-red-400`}
      >
        <Mic size={20} className={isListening ? 'text-white' : 'text-gray-800 dark:text-gray-300'} />
      </button>
    </div>
  );
};

export default SearchBar;
