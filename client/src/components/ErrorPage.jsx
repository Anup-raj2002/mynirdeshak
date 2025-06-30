import React from 'react';
import { motion } from 'framer-motion';

const ErrorPage = ({ message = "Something went wrong" }) => (
  <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="max-w-3xl w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center"
      >
        {/* Heading and Subheading */}
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">Oops!</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{message}</h2>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
          An unexpected error has occurred. Please try reloading the page or contact support if the problem persists.
        </p>
        {/* Vector Illustration */}
        <svg viewBox="0 0 400 200" className="w-full max-w-md h-auto mb-8">
          <defs>
            <linearGradient id="errorGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="errorGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E42" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            cx="200" cy="170" rx="120" ry="20" fill="url(#errorGrad1)" opacity="0.1"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            cx="120" cy="90" r="40" fill="url(#errorGrad1)" opacity="0.15"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            cx="280" cy="100" r="60" fill="url(#errorGrad2)" opacity="0.15"
          />
          <motion.g
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <circle cx="200" cy="100" r="40" fill="url(#errorGrad1)" opacity="0.8" />
            <rect x="185" y="120" width="30" height="8" rx="4" fill="#fff" opacity="0.8" />
            <circle cx="190" cy="95" r="5" fill="#fff" />
            <circle cx="210" cy="95" r="5" fill="#fff" />
            <ellipse cx="200" cy="110" rx="8" ry="4" fill="#fff" opacity="0.7" />
            <rect x="192" y="80" width="16" height="4" rx="2" fill="#fff" opacity="0.7" />
          </motion.g>
        </svg>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
        >
          Reload Page
        </button>
      </motion.div>
    </div>
  </div>
);

export default ErrorPage; 