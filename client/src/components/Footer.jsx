import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'How It Works', path: '/how-it-works' },
      { name: 'Scholarships', path: '/scholarships' }
    ],
    'Support': [
      { name: 'Register Now', path: '/register' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Login', path: '/login' },
      { name: 'Sign Up', path: '/signup' }
    ],
    'Legal': [
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Refund Policy', path: '/refund' },
      { name: 'Disclaimer', path: '/disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden font-inter">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
          <defs>
            <pattern id="footerPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300"
                >
                  <GraduationCap className="h-8 w-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold">My nirdeshak</h1>
                  <p className="text-blue-200 text-sm">Educational Excellence</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering students with scholarships to pursue higher education 
                and achieve their dreams. Founded by Love Kumar Sharma with a vision 
                to make quality education accessible to all.
              </p>
              
              <div className="space-y-3">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>mynirdeshak@gmail.com</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span>+91 12345 67890</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>New Delhi, India</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-blue-200">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (linkIndex * 0.05), duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href={link.path}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <p className="text-gray-300">
                © {currentYear} My nirdeshak. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Founded by Love Kumar Sharma | Empowering Education Since 2024
              </p>
            </motion.div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gray-800 ${social.color} p-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl`}
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
