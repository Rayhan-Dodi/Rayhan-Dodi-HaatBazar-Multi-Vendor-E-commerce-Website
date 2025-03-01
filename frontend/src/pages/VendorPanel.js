import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag, UploadCloud, Tag, Cube } from "lucide-react";

const VendorPanel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Products Listed</h3>
              <p className="text-2xl font-semibold">320</p>
            </div>
            <ShoppingBag className="w-10 h-10 text-indigo-500" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Pending Uploads</h3>
              <p className="text-2xl font-semibold">12</p>
            </div>
            <UploadCloud className="w-10 h-10 text-green-500" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Active Discounts</h3>
              <p className="text-2xl font-semibold">5</p>
            </div>
            <Tag className="w-10 h-10 text-yellow-500" />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Total Revenue</h3>
              <p className="text-2xl font-semibold">$14,290</p>
            </div>
            <Cube className="w-10 h-10 text-red-500" />
          </CardContent>
        </Card>
      </div>

      {/* AR Product Preview Section */}
      <div className="mt-10 bg-gray-900 rounded-2xl shadow-xl p-6">
        <h2 className="text-white text-2xl font-bold mb-4">AR Product Preview</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 p-6 rounded-xl shadow-lg hover:shadow-2xl"
          >
            <div className="text-white text-center">
              <h3 className="text-lg font-bold">Preview Your Product in AR</h3>
              <p className="mt-2 text-sm">Use our augmented reality feature to visualize your products in real-world settings.</p>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Launch AR Viewer</Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl"
          >
            <Cube className="text-indigo-500 w-20 h-20 animate-spin" />
          </motion.div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent>
            <h3 className="text-lg font-bold">Manage Products</h3>
            <p className="mt-2 text-sm">Add, edit, and remove products from your listings to keep your inventory updated.</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700">Manage</Button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl">
          <CardContent>
            <h3 className="text-lg font-bold">Upload Media</h3>
            <p className="mt-2 text-sm">Upload high-quality product images and videos to attract more customers.</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Upload</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorPanel;
