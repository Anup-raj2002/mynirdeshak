import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Globe, 
  Sparkles,
  Clock,
  Users,
  TrendingUp,
  Star,
  ChevronRight
} from 'lucide-react';

const Global = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Cycling animation for sparkles
    const timer = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 7);
    }, 1500);

    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const continentsData = [
    {
      name: 'Asia',
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-300',
      hoverColor: 'hover:from-red-100 hover:to-pink-100',
      textColor: 'text-red-700',
      iconBg: 'bg-red-500',
      countries: 48,
      population: '4.6B',
      description: 'The largest and most populous continent',
      position: { top: '25%', left: '65%' }
    },
    {
      name: 'Africa',
      color: 'from-orange-500 to-yellow-600',
      bgColor: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-300',
      hoverColor: 'hover:from-orange-100 hover:to-yellow-100',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-500',
      countries: 54,
      population: '1.4B',
      description: 'The cradle of humanity and civilization',
      position: { top: '40%', left: '50%' }
    },
    {
      name: 'North America',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-300',
      hoverColor: 'hover:from-blue-100 hover:to-indigo-100',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-500',
      countries: 23,
      population: '580M',
      description: 'Land of innovation and opportunity',
      position: { top: '20%', left: '20%' }
    },
    {
      name: 'South America',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-300',
      hoverColor: 'hover:from-green-100 hover:to-emerald-100',
      textColor: 'text-green-700',
      iconBg: 'bg-green-500',
      countries: 12,
      population: '430M',
      description: 'Rich in biodiversity and culture',
      position: { top: '55%', left: '30%' }
    },
    {
      name: 'Europe',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-300',
      hoverColor: 'hover:from-purple-100 hover:to-violet-100',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-500',
      countries: 44,
      population: '750M',
      description: 'Center of art, culture, and history',
      position: { top: '15%', left: '48%' }
    },
    {
      name: 'Australia/Oceania',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-300',
      hoverColor: 'hover:from-teal-100 hover:to-cyan-100',
      textColor: 'text-teal-700',
      iconBg: 'bg-teal-500',
      countries: 14,
      population: '45M',
      description: 'Unique wildlife and pristine nature',
      position: { top: '65%', left: '75%' }
    },
    {
      name: 'Antarctica',
      color: 'from-slate-500 to-gray-600',
      bgColor: 'from-slate-50 to-gray-50',
      borderColor: 'border-slate-300',
      hoverColor: 'hover:from-slate-100 hover:to-gray-100',
      textColor: 'text-slate-700',
      iconBg: 'bg-slate-500',
      countries: 0,
      population: '~5K',
      description: 'The frozen continent of research',
      position: { top: '85%', left: '50%' }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-32 h-32 rounded-full opacity-5 animate-pulse ${
              i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-green-400'
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + i * 15}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 relative overflow-hidden">
              {/* Animated sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className={`absolute w-4 h-4 text-blue-400 transition-all duration-1000 ${
                      animationPhase === i % 7 ? 'opacity-100 scale-110' : 'opacity-30 scale-90'
                    }`}
                    style={{
                      left: `${5 + i * 8}%`,
                      top: `${10 + (i % 4) * 20}%`,
                      transform: `rotate(${i * 30}deg)`
                    }}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-center mb-6 relative">
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300">
                  <Globe className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Mynirdeshak Global
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 mb-6 animate-fade-in">
                Expanding Worldwide
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
                Discover our global presence across all seven continents. We're bringing quality education and scholarship opportunities to students worldwide.
              </p>
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 border border-blue-200 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                <p className="text-blue-800 font-medium">
                  🌍 Connecting students globally • 🎓 Expanding educational opportunities • 🚀 Building the future together
                </p>
              </div>
            </div>
          </div>

          {/* Interactive World Map Section */}
          <div className={`mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 relative overflow-hidden">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Interactive Global Map</h3>
              
              {/* World Map Container */}
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 rounded-xl border-2 border-gray-200 overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shimmer" />
                </div>
                
                {/* Continent Markers */}
                {continentsData.map((continent, index) => (
                  <div
                    key={continent.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ 
                      top: continent.position.top, 
                      left: continent.position.left,
                      animationDelay: `${index * 200}ms`
                    }}
                    onMouseEnter={() => setHoveredContinent(continent.name)}
                    onMouseLeave={() => setHoveredContinent(null)}
                  >
                    {/* Location Pin */}
                    <div className={`relative ${continent.iconBg} p-3 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-125 animate-bounce`}
                         style={{ animationDelay: `${index * 0.5}s`, animationDuration: '2s' }}>
                      <MapPin className="h-6 w-6 text-white" />
                      
                      {/* Pulse Effect */}
                      <div className={`absolute inset-0 ${continent.iconBg} rounded-full animate-ping opacity-75`} />
                    </div>
                    
                    {/* Hover Tooltip */}
                    {hoveredContinent === continent.name && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 animate-slideUp">
                        <div className={`bg-gradient-to-r ${continent.color} text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap relative`}>
                          <div className="text-sm font-bold">{continent.name}</div>
                          <div className="text-xs opacity-90">Coming Soon</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Floating "Coming Soon" badges */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  🚀 Expanding Soon
                </div>
                <div className="absolute bottom-4 left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold animate-pulse" style={{ animationDelay: '1s' }}>
                  🌟 Global Launch
                </div>
              </div>
            </div>
          </div>

          {/* Continents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {continentsData.map((continent, index) => (
              <div
                key={continent.name}
                className={`transform transition-all duration-1000 delay-${(index + 1) * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                onMouseEnter={() => setHoveredContinent(continent.name)}
                onMouseLeave={() => setHoveredContinent(null)}
              >
                <div className={`bg-white rounded-xl shadow-lg border ${continent.borderColor} overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer`}>
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${continent.color} p-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shimmer" />
                    </div>
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{continent.name}</h3>
                        <div className="flex items-center text-white/80 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{continent.countries} Countries</span>
                        </div>
                      </div>
                      <div className={`${continent.iconBg} p-2 rounded-lg shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`p-6 bg-gradient-to-br ${continent.bgColor} ${continent.hoverColor} transition-all duration-300`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className={`h-5 w-5 ${continent.textColor} mr-2`} />
                          <span className="text-gray-700 font-medium">Population</span>
                        </div>
                        <span className={`font-bold ${continent.textColor}`}>{continent.population}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">{continent.description}</p>
                      
                      {/* Coming Soon Badge */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                          <span className="text-yellow-700 font-medium text-sm">Coming Soon</span>
                        </div>
                        <ChevronRight className={`h-5 w-5 ${continent.textColor} transform transition-all duration-300 group-hover:translate-x-1`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  {hoveredContinent === continent.name && (
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center animate-fadeIn">
                      <div className="bg-white rounded-lg p-4 shadow-xl transform animate-scaleIn">
                        <div className="text-center">
                          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                          <p className="font-bold text-gray-800">Coming Soon!</p>
                          <p className="text-sm text-gray-600">Stay tuned for updates</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-xl p-8 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shimmer" />
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Global Impact Statistics</h3>
                  <p className="text-white/90 text-lg">Our worldwide reach and commitment to education</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">7</div>
                    <div className="text-white/80">Continents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">195</div>
                    <div className="text-white/80">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">8B+</div>
                    <div className="text-white/80">People</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">∞</div>
                    <div className="text-white/80">Possibilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default Global;