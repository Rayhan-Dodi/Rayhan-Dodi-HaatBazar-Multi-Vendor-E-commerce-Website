import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { ShoppingCart, Package, User, BarChart2 } from "lucide-react";

const Dashboard = () => {
  const chartData = [
    { name: "Orders", value: 400 },
    { name: "Returns", value: 150 },
    { name: "Revenue", value: 350 },
    { name: "Products Sold", value: 600 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Orders</h3>
              <p className="text-2xl font-semibold">1,245</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-indigo-500" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Products</h3>
              <p className="text-2xl font-semibold">542</p>
            </div>
            <Package className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Users</h3>
              <p className="text-2xl font-semibold">321</p>
            </div>
            <User className="w-10 h-10 text-yellow-500" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Revenue</h3>
              <p className="text-2xl font-semibold">$18,734</p>
            </div>
            <BarChart2 className="w-10 h-10 text-red-500" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="mt-10 bg-gray-900 rounded-2xl shadow-xl p-6">
        <h2 className="text-white text-2xl font-bold mb-4">Performance Overview</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 h-80"
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          <div className="text-white">
            <p className="text-lg">Stay on top of your performance metrics and track growth with detailed visual insights.</p>
            <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">View Detailed Report</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
