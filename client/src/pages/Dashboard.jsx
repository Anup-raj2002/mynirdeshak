import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Calendar, BookOpen, TrendingUp, Bell, Settings, LogOut } from 'lucide-react';
import SettingsModal from '../components/SettingsModal';
import { useUser } from '../contexts/UserContext';
import { logout } from '../api/auth';
import { useNotification } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorPage from '../components/ErrorPage';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, loading, error } = useUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error.message || "Can't find your profile"} />;
  if (!profile || profile.role !== 'student') {
    return <ErrorPage message="Access Denied. You must be a student to view this page." />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      showNotification('You have been logged out.', 'success');
    } catch (error) {
      showNotification('Logout failed. Please try again.', 'error');
    }
  };

  const stats = [
    { icon: Award, label: 'Current Rank', value: 'TBD', color: 'from-yellow-400 to-orange-500' },
    { icon: BookOpen, label: 'Exam Status', value: 'Scheduled', color: 'from-blue-400 to-indigo-500' },
    { icon: Calendar, label: 'Exam Date', value: 'Feb 20, 2024', color: 'from-green-400 to-emerald-500' },
    { icon: TrendingUp, label: 'Scholarship', value: 'Pending', color: 'from-purple-400 to-pink-500' }
  ];

  return (
    <>
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
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full">
                  {profile?.photoUrl ? (
                    <img src={profile.photoUrl} alt="Profile" className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.name || 'User'}!</h1>
                  <p className="text-gray-600 text-lg">{profile?.email}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
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
          <div className="lg:col-span-3 space-y-8">
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
          </div>
        </div>
      </div>
    </div>
      <SettingsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Dashboard;