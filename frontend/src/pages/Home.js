import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState([]);

  useEffect(() => {
    // Fetch trending items (mock data for now)
    setTrendingItems([
      { id: 1, title: "Smartphone 12 Pro", image: "https://via.placeholder.com/150" },
      { id: 2, title: "Wireless Earbuds", image: "https://via.placeholder.com/150" },
      { id: 3, title: "4K Smart TV", image: "https://via.placeholder.com/150" },
    ]);

    // Fetch personalized suggestions (mock data for now)
    setPersonalizedSuggestions([
      { id: 4, title: "Gaming Laptop", image: "https://via.placeholder.com/150" },
      { id: 5, title: "Mechanical Keyboard", image: "https://via.placeholder.com/150" },
      { id: 6, title: "Smartwatch X", image: "https://via.placeholder.com/150" },
    ]);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
      <div className="container mx-auto">
        {/* Trending Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {trendingItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Personalized Suggestions Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {personalizedSuggestions.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
