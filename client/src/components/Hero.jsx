import React from 'react';
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Students studying"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Track Your Way to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Success
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Empowering 12th grade graduates with scholarships to pursue higher education. 
            Your journey to success starts here.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Award className="h-12 w-12 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-3xl font-bold mb-2">₹1,00,000</h3>
              <p className="text-blue-100">Top Scholarship Award</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Users className="h-12 w-12 text-green-400 mb-4 mx-auto" />
              <h3 className="text-3xl font-bold mb-2">1000+</h3>
              <p className="text-blue-100">Students Supported</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <BookOpen className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-3xl font-bold mb-2">95%</h3>
              <p className="text-blue-100">Success Rate</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#register"
              className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#how-it-works"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30 hover:border-white/50"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;