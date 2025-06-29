import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div className="max-w-3xl w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center"
      >
        {/* Heading and Subheading */}
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        {/* Vector Illustration */}
        <svg viewBox="0 0 400 200" className="w-full max-w-md h-auto mb-8">
          <defs>
            <linearGradient id="notfoundGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="notfoundGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <motion.ellipse
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            cx="200" cy="170" rx="120" ry="20" fill="url(#notfoundGrad1)" opacity="0.1"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            cx="100" cy="80" r="40" fill="url(#notfoundGrad1)" opacity="0.15"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            cx="300" cy="100" r="60" fill="url(#notfoundGrad2)" opacity="0.15"
          />
          <motion.rect
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            x="140" y="60" width="120" height="60" rx="20" fill="url(#notfoundGrad1)" opacity="0.8"
          />
          <motion.text
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            x="200" y="100" textAnchor="middle" fontSize="32" fill="#fff" fontWeight="bold"
          >
            404
          </motion.text>
        </svg>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go to Home
        </Link>
      </motion.div>
    </div>
  </div>
);

export default NotFound; 