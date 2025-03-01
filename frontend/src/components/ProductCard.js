import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="relative group w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Holographic Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>

      {/* Product Image */}
      <div className="relative p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
            ${product.price}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-500">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;