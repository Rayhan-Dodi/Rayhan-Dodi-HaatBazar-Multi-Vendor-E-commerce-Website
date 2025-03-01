import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const Login = () => {
  const [isOTP, setIsOTP] = useState(false);

  const handleSocialLogin = (platform) => {
    console.log(`Logging in with ${platform}`);
  };

  const handleBiometricAuth = () => {
    console.log('Biometric Authentication Triggered');
  };

  const handleSendOTP = () => {
    console.log('Sending OTP');
    setIsOTP(true);
  };

  const handleVerifyOTP = () => {
    console.log('Verifying OTP');
    // Logic for OTP verification
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Login
        </h2>

        {/* Social Login */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            <FaGoogle size={20} />
          </button>
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaFacebook size={20} />
          </button>
          <button
            onClick={() => handleSocialLogin('Apple')}
            className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-700"
          >
            <FaApple size={20} />
          </button>
        </div>

        {/* Biometric Authentication */}
        <div className="text-center mb-6">
          <button
            onClick={handleBiometricAuth}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Use Fingerprint or Face ID
          </button>
        </div>

        {/* OTP Authentication */}
        {!isOTP ? (
          <div className="text-center mb-4">
            <button
              onClick={handleSendOTP}
              className="w-full p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
