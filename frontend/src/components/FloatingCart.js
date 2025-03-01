import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingCart = ({ cartItems, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Cart Icon */}
      <button
        onClick={toggleCart}
        className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500"
      >
        <ShoppingCart size={24} />
      </button>

      {/* Floating Cart Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg w-80 p-4"
        >
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="mt-4 space-y-4 max-h-64 overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center">Your cart is empty.</p>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between text-gray-800 dark:text-gray-200">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${calculateTotal()}</span>
              </div>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
              >
                Checkout
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FloatingCart;