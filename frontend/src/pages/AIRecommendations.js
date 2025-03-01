import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch recommendations
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          title: "Wireless Earbuds",
          description: "Experience high-quality sound with noise cancellation.",
          price: "$59.99",
          image: "/images/earbuds.jpg",
        },
        {
          id: 2,
          title: "Smartwatch",
          description: "Track your health and stay connected on the go.",
          price: "$199.99",
          image: "/images/smartwatch.jpg",
        },
        {
          id: 3,
          title: "Portable Charger",
          description: "Stay powered up wherever you are.",
          price: "$29.99",
          image: "/images/charger.jpg",
        },
      ];
      setRecommendations(mockData);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-500" />
          <p className="text-gray-500 mt-4">Loading personalized recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">AI Recommendations</h1>
        <p className="text-gray-600 mt-2">Tailored product suggestions just for you!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                <p className="text-indigo-600 font-bold mt-4">{item.price}</p>
                <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
