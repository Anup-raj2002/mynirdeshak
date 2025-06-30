import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, BookOpen, Star, TrendingUp, Shield, Zap } from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: Award, value: '₹1,00,000', label: 'Top Scholarship', color: 'from-yellow-400 to-orange-500' },
    { icon: Users, value: '2,500+', label: 'Students Registered', color: 'from-green-400 to-emerald-500' },
    { icon: BookOpen, value: '95%', label: 'Success Rate', color: 'from-purple-400 to-pink-500' },
    { icon: TrendingUp, value: '₹50L+', label: 'Total Distributed', color: 'from-blue-400 to-cyan-500' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Merit-Based Selection',
      description: 'Fair and transparent evaluation process based on academic performance',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Quick Processing',
      description: 'Fast scholarship disbursement directly to your college for fee payment',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Star,
      title: 'No Hidden Charges',
      description: 'Completely free registration and examination process for all students',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Vector Illustration */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M100,200 Q200,100 300,200 T500,200"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              cx="200"
              cy="150"
              r="50"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Track Your Way to
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                >
                  Success
                </motion.span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Empowering 12th grade graduates with scholarships to pursue higher education. 
              Your journey to success starts here with Love Kumar Sharma's vision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-2xl"
                >
                  <span>Start Your Journey</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
              </Link>
              <Link to="/how-it-works">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl w-fit mx-auto mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-blue-100 text-sm">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Track Your Way?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to making higher education accessible through our transparent and merit-based scholarship program.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already started their path to educational success with our scholarship program.
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Register Now - It's Free!
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;