import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Calendar, BookOpen, TrendingUp, Bell, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const studentData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    registrationDate: '2024-01-15',
    examStatus: 'Scheduled',
    examDate: '2024-02-20',
    rank: 'Not Available',
    scholarshipAmount: 'Pending'
  };

  const stats = [
    { icon: Award, label: 'Current Rank', value: 'TBD', color: 'from-yellow-400 to-orange-500' },
    { icon: BookOpen, label: 'Exam Status', value: 'Scheduled', color: 'from-blue-400 to-indigo-500' },
    { icon: Calendar, label: 'Exam Date', value: 'Feb 20, 2024', color: 'from-green-400 to-emerald-500' },
    { icon: TrendingUp, label: 'Scholarship', value: 'Pending', color: 'from-purple-400 to-pink-500' }
  ];

  const notifications = [
    { id: 1, message: 'Exam scheduled for February 20, 2024', time: '2 hours ago', type: 'info' },
    { id: 2, message: 'Registration completed successfully', time: '1 day ago', type: 'success' },
    { id: 3, message: 'Please verify your email address', time: '2 days ago', type: 'warning' }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentData.name}!</h1>
                  <p className="text-gray-600 text-lg">{studentData.email}</p>
                  <p className="text-sm text-gray-500">Registered on {new Date(studentData.registrationDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl w-fit mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Exam Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Exam Information</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Upcoming Exam</h3>
                  <p className="text-blue-700 mb-4">Your examination is scheduled for February 20, 2024 at 10:00 AM IST</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      View Exam Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Download Admit Card
                    </motion.button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Exam Duration</h4>
                    <p className="text-gray-600">2 hours</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Total Questions</h4>
                    <p className="text-gray-600">100 questions</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Exam Mode</h4>
                    <p className="text-gray-600">Online</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Result Date</h4>
                    <p className="text-gray-600">March 5, 2024</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Progress Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Progress</h2>
              
              <div className="space-y-4">
                {[
                  { step: 'Registration', status: 'completed', date: 'Jan 15, 2024' },
                  { step: 'Document Verification', status: 'completed', date: 'Jan 16, 2024' },
                  { step: 'Exam Scheduled', status: 'current', date: 'Feb 20, 2024' },
                  { step: 'Result Declaration', status: 'pending', date: 'Mar 5, 2024' },
                  { step: 'Scholarship Disbursement', status: 'pending', date: 'TBD' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        item.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {item.step}
                      </h4>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    {item.status === 'completed' && (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    )}
                    {item.status === 'current' && (
                      <span className="text-blue-600 text-sm font-medium">In Progress</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
                <Bell className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Update Profile', color: 'bg-blue-600 hover:bg-blue-700' },
                  { label: 'Download Documents', color: 'bg-green-600 hover:bg-green-700' },
                  { label: 'Contact Support', color: 'bg-purple-600 hover:bg-purple-700' },
                  { label: 'View Guidelines', color: 'bg-orange-600 hover:bg-orange-700' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full ${action.color} text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200`}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;