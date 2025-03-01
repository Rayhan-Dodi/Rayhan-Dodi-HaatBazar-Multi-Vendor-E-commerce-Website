import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Register = () => {
  const [isOTP, setIsOTP] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');

  const handleSendOTP = () => {
    console.log('Sending OTP to', email);
    setIsOTP(true);
  };

  const handleVerifyOTP = () => {
    console.log('Verifying OTP:', otp);
    // OTP verification logic
  };

  const handleRegister = () => {
    console.log('Registering user:', { username, email, password });
    // Registration logic
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Create an Account
        </h2>

        {!isOTP ? (
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            <button
              onClick={handleSendOTP}
              className="w-full p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              className="w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 mb-4"
            >
              Verify OTP
            </button>

            <button
              onClick={handleRegister}
              className="w-full p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Complete Registration
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Register;