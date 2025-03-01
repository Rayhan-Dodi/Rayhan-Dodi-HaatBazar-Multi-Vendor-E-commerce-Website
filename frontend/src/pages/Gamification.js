import React, { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Star, Gift, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Gamification = () => {
  const [points, setPoints] = useState(1500);
  const [rewards, setRewards] = useState(["Bronze Badge", "Exclusive Offer"]);

  const handleEarnPoints = () => {
    setPoints(points + 100);
  };

  const handleRedeemReward = (reward) => {
    setRewards(rewards.filter((r) => r !== reward));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-white font-bold">Gamification System</h1>
        <p className="text-gray-300 mt-2">Engage with the platform and earn exciting rewards!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="bg-gradient-to-br from-indigo-700 to-indigo-800 text-white shadow-lg">
          <CardContent className="text-center">
            <h3 className="text-lg font-bold">Your Points</h3>
            <p className="text-2xl font-semibold mt-2">{points}</p>
            <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700" onClick={handleEarnPoints}>
              Earn More Points
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-700 to-purple-800 text-white shadow-lg">
          <CardContent className="text-center">
            <h3 className="text-lg font-bold">Achievements</h3>
            <div className="flex justify-center gap-4 mt-4">
              <BadgeCheck className="w-10 h-10 text-green-400" />
              <Star className="w-10 h-10 text-yellow-400" />
              <Medal className="w-10 h-10 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-lg">
          <CardContent className="text-center">
            <h3 className="text-lg font-bold">Top Rewards</h3>
            <ul className="mt-4">
              {rewards.map((reward, index) => (
                <li key={index} className="flex items-center justify-between mt-2">
                  <span>{reward}</span>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleRedeemReward(reward)}
                  >
                    Redeem
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-700 to-teal-800 text-white shadow-lg">
          <CardContent className="text-center">
            <h3 className="text-lg font-bold">Surprise Box</h3>
            <div className="flex justify-center mt-4">
              <Gift className="w-16 h-16 text-yellow-400 animate-bounce" />
            </div>
            <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700">Open Now</Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <motion.div
          className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
        >
          Stay active to unlock more rewards!
        </motion.div>
      </div>
    </div>
  );
};

export default Gamification;
