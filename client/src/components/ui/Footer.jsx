import React, { useState } from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const footerLinks = {
    "Quick Links": [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "How It Works", path: "/how-it-works" },
      { name: "Scholarships", path: "/scholarships" },
    ],
    Support: [
      { name: "Register Now", path: "/register" },
      { name: "Contact Us", path: "/contact" },
      { name: "Login", path: "/login" },
      { name: "Sign Up", path: "/signup" },
    ],
    Legal: [
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Guidelines", path: "/guidelines" },
      { name: "Refund Policy", path: "/refund-policy" },
      { name: "Disclaimer", path: "/disclaimer" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600", gradientFrom: "from-blue-400", gradientTo: "to-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600", gradientFrom: "from-pink-400", gradientTo: "to-purple-600" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700", gradientFrom: "from-blue-500", gradientTo: "to-blue-700" },
  ];

  // Floating particles data
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 3,
  }));

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden font-inter">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${particle.left}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent transform rotate-12"></div>
        <svg width="80" height="80" viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            <pattern id="footerPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="currentColor" className="animate-pulse" />
              <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="60" cy="60" r="1" fill="currentColor" opacity="0.5" />
              <path d="M40,20 L60,40 L40,60 L20,40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Enhanced Company Info - Left Aligned */}
            <div className="lg:col-span-4 space-y-4 relative">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
              
              <div className="relative group">
                {/* Logo and Title - Left Aligned */}
                <div className="flex items-center space-x-3 mb-4 group/logo">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full overflow-hidden flex items-center justify-center">
  <img src="../../assets/LOGO.jpg" alt="Logo" className="h-full w-full object-cover" />
</div>

                    {/* Sparkle effect */}
                    <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 animate-pulse" />
                  </div>
                  <div className="relative">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent bg-300% animate-gradient-x">
                      My nirdeshak
                    </h1>
                    <p className="text-blue-300 text-sm font-medium transform transition-all duration-300 group-hover/logo:text-blue-200">Educational Excellence</p>
                  </div>
                </div>
                
                {/* Quote - Left Aligned */}
                <blockquote className="text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4 py-2 mb-4 relative group/quote">
                  <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 transform scale-y-0 group-hover/quote:scale-y-100 transition-transform duration-500 origin-bottom"></div>
                  <p className="italic text-base mb-1 transform transition-all duration-300 group-hover/quote:text-white">
                    "Empowering students with scholarships to pursue higher education and achieve their dreams."
                  </p>
                </blockquote>
                
                {/* Enhanced Social Links - Left Aligned */}
                <div>
                  <h4 className="text-blue-200 font-semibold mb-3 text-sm relative">
                    Follow Us
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-transparent"></div>
                  </h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <div
                          key={social.label}
                          className="relative group/social"
                          onMouseEnter={() => setHoveredSocial(social.label)}
                          onMouseLeave={() => setHoveredSocial(null)}
                        >
                          {/* Ripple effect */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.gradientFrom} ${social.gradientTo} opacity-0 group-hover/social:opacity-30 scale-50 group-hover/social:scale-150 transition-all duration-500 blur-sm`}></div>
                          
                          <a
                            href={social.href}
                            className={`relative bg-gray-800/80 ${social.color} p-2 rounded-xl border border-gray-700 transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400/50 group-hover/social:shadow-xl block`}
                            aria-label={social.label}
                            rel="noopener noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                          >
                            <IconComponent className="h-5 w-5 text-white transform transition-all duration-300 group-hover/social:scale-110" />
                            
                            {/* Tooltip */}
                            {hoveredSocial === social.label && (
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-xs px-2 py-1 rounded-lg border border-gray-700 opacity-0 animate-fade-in">
                                {social.label}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-900"></div>
                              </div>
                            )}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Footer Links */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <div
                  key={category}
                  className="space-y-3 relative group/section"
                >
                  {/* Section header with creative styling */}
                  <div className="relative">
                    <h3 className="text-lg font-semibold text-blue-200 pb-2 relative z-10">
                      {category}
                    </h3>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover/section:w-full transition-all duration-500"></div>
                    <div className="absolute -top-1 -left-2 w-1 h-0 bg-gradient-to-b from-blue-400 to-transparent group-hover/section:h-8 transition-all duration-300"></div>
                  </div>
                  
                  <ul className="space-y-2">
                    {links.map((link, linkIndex) => (
                      <li
                        key={link.name}
                        className="group/link relative"
                        style={{ 
                          animation: `slideInLeft 0.6s ease-out ${categoryIndex * 0.1 + linkIndex * 0.05}s both` 
                        }}
                      >
                        <a
                          href={link.path}
                          className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group/link text-sm relative overflow-hidden py-1"
                          style={{ textDecoration: 'none' }}
                        >
                          {/* Background slide effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent transform -translate-x-full group-hover/link:translate-x-0 transition-transform duration-300 rounded"></div>
                          
                          <span className="relative z-10 transform group-hover/link:translate-x-1 transition-transform duration-300">
                            {link.name}
                          </span>
                          <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/link:opacity-100 transform translate-x-0 group-hover/link:translate-x-1 transition-all duration-300 text-blue-400 relative z-10" />
                          
                          {/* Animated underline */}
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover/link:w-full transition-all duration-300"></div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Enhanced Contact Info */}
            <div className="lg:col-span-2 space-y-3 relative group/contact">
              <div className="relative">
                <h3 className="text-lg font-semibold text-blue-200 pb-2 relative">
                  Get In Touch
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover/contact:w-full transition-all duration-500"></div>
                </h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { icon: Phone, label: "Phone", value: "+91 7078899711", color: "text-green-400" },
                  { icon: Mail, label: "Email", value: "mynirdeshak@gmail.com", color: "text-blue-400" },
                  { icon: MapPin, label: "Address", value: "Knowledge Park III,\nGreater Noida UP, 201306", color: "text-purple-400" }
                ].map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <div
                      key={contact.label}
                      className="flex items-start space-x-3 p-2 rounded-lg relative group/contact-item transform transition-all duration-300 hover:scale-105 hover:bg-white/5"
                      style={{ 
                        animation: `fadeInUp 0.8s ease-out ${0.3 + index * 0.1}s both` 
                      }}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover/contact-item:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      
                      <div className={`bg-blue-500/20 p-2 rounded-lg relative group-hover/contact-item:bg-opacity-40 transition-all duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-lg opacity-0 group-hover/contact-item:opacity-100 transition-opacity duration-300`}></div>
                        <IconComponent className={`h-5 w-5 ${contact.color} relative z-10 transform group-hover/contact-item:scale-110 transition-transform duration-300`} />
                      </div>
                      <div className="relative z-10">
                        <p className="text-gray-400 text-xs uppercase tracking-wide group-hover/contact-item:text-gray-300 transition-colors duration-300">
                          {contact.label}
                        </p>
                        <p className="text-white font-medium text-xs group-hover/contact-item:text-blue-100 transition-colors duration-300">
                          {contact.value.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < contact.value.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Footer */}
        <div className="border-t border-gray-700/50 py-4 relative">
          {/* Animated border gradient */}
          <div className="absolute top-0 left-0 w-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-border-flow"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
            <div className="text-center lg:text-left group/copyright">
              <p className="text-gray-300 font-medium text-sm transform transition-all duration-300 group-hover/copyright:text-white">
                © {currentYear} My nirdeshak. All rights reserved. | Designed and developed by{' '}
                <span className="text-blue-300 font-medium bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent hover:from-blue-200 hover:to-purple-300 transition-all duration-300 cursor-default">
                  Digimoga Re-innovations
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-10px) rotate(90deg); opacity: 0.6; }
          50% { transform: translateY(-5px) rotate(180deg); opacity: 0.8; }
          75% { transform: translateY(-15px) rotate(270deg); opacity: 0.6; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes border-flow {
          0% { width: 0%; left: 0%; }
          50% { width: 100%; left: 0%; }
          100% { width: 0%; left: 100%; }
        }
        
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-border-flow { animation: border-flow 3s ease-in-out infinite; }
        .bg-300% { background-size: 300% 300%; }
        .rotate-360 { transform: rotate(360deg); }
      `}</style>
    </footer>
  );
};

export default Footer;