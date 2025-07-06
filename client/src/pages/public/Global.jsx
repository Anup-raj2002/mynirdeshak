"use client"

import { useState, useEffect } from "react"
import { MapPin, Globe, Sparkles, GraduationCap } from "lucide-react"

const Global = () => {
  const [hoveredLocation, setHoveredLocation] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)

    // Cycling animation for sparkles and pins
    const animationTimer = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 7)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(animationTimer)
    }
  }, [])

  // Continent locations with your updated positioning
  const continentLocations = [
    {
      id: "north-america",
      name: "North America",
      position: { top: "18%", left: "18%" },
      color: "bg-green-500",
      delay: "0s",
    },
    {
      id: "south-america",
      name: "South America",
      position: { top: "55%", left: "30%" },
      color: "bg-purple-500",
      delay: "0.2s",
    },
    {
      id: "europe",
      name: "Europe",
      position: { top: "11%", left: "50%" },
      color: "bg-blue-500",
      delay: "0.4s",
    },
    {
      id: "asia",
      name: "Asia",
      position: { top: "25%", left: "68%" },
      color: "bg-yellow-500",
      delay: "0.6s",
    },
    {
      id: "africa",
      name: "Africa",
      position: { top: "40%", left: "52%" },
      color: "bg-orange-500",
      delay: "0.8s",
    },
    {
      id: "australia",
      name: "Australia",
      position: { top: "60%", left: "82%" },
      color: "bg-red-500",
      delay: "1s",
    },
    {
      id: "antarctica",
      name: "Antarctica",
      position: { top: "92%", left: "50%" },
      color: "bg-cyan-500",
      delay: "1.2s",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-2 sm:p-4 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-5 animate-float ${
              i % 2 === 0 ? "bg-blue-400" : "bg-indigo-400"
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Animation */}
        <div
          className={`text-center mb-4 sm:mb-6 lg:mb-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            {/* Animated sparkles around header */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={`absolute w-4 h-4 sm:w-6 sm:h-6 text-blue-400 transition-all duration-1000 ${
                    animationPhase === i ? "opacity-100 scale-110" : "opacity-30 scale-90"
                  }`}
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${10 + (i % 2) * 20}%`,
                    transform: `rotate(${i * 60}deg)`,
                  }}
                />
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 flex flex-col sm:flex-row items-center justify-center relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 sm:p-3 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300 mb-2 sm:mb-0 sm:mr-3">
                <Globe className="h-6 w-6 sm:h-8 lg:h-10 sm:w-8 lg:w-10 text-white animate-spin-slow" />
              </div>
              <span className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Global University Partnerships
              </span>
            </h1>

            {/* Mynirdeshak Expansion Note */}
            <div
              className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg mx-auto max-w-fit mb-4 transform transition-all duration-1000 delay-300 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <p className="text-sm sm:text-base font-medium flex items-center justify-center">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-bounce" />
                Mynirdeshak is expanding globally to connect students with world-class universities
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">
              Hover over continent markers to see upcoming partnerships
            </p>
          </div>
        </div>

        {/* World Map Container with Animation */}
        <div
          className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 p-2 sm:p-4 lg:p-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
            {/* World Map Background with continent outlines */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100">
              <img
                src="../../assets/worldmap.jpg"
                alt="World Map showing seven continents"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500"
              />
            </div>

            {/* Animated overlay with shimmer effect */}
            <div className="absolute inset-0 bg-white/20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer" />
            </div>

            {/* Continent Location Pins with Staggered Animation */}
            {continentLocations.map((location, index) => (
              <div
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-0"
                }`}
                style={{
                  top: location.position.top,
                  left: location.position.left,
                  transitionDelay: `${0.7 + index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Location Pin with Enhanced Animation */}
                <div
                  className={`relative ${location.color} p-2 sm:p-3 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-125 hover:shadow-2xl border-2 border-white cursor-pointer ${
                    animationPhase === index ? "animate-bounce" : ""
                  }`}
                >
                  <MapPin className="h-4 w-4 sm:h-5 lg:h-6 sm:w-5 lg:w-6 text-white" />

                  {/* Enhanced Pulse Effect */}
                  <div className={`absolute inset-0 ${location.color} rounded-full animate-ping opacity-75`} />
                  <div className={`absolute inset-0 ${location.color} rounded-full animate-pulse opacity-50`} />
                </div>

                {/* Enhanced Hover Tooltip */}
                {hoveredLocation === location.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 sm:mb-4 z-20">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-2xl whitespace-nowrap relative animate-slideUp">
                      <div className="text-xs sm:text-sm font-bold">{location.name}</div>
                      <div className="text-xs opacity-90 mt-1 flex items-center">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Coming Soon
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Animated Map Legend */}
            <div
              className={`absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-4 shadow-lg max-w-[140px] sm:max-w-none transform transition-all duration-1000 delay-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">Continents</h3>
              <div className="space-y-1 sm:space-y-2">
                {continentLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`flex items-center text-xs text-gray-600 transform transition-all duration-300 ${
                      isVisible ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
                    }`}
                    style={{ transitionDelay: `${1.1 + index * 0.05}s` }}
                  >
                    <div
                      className={`w-2 h-2 sm:w-3 sm:h-3 ${location.color} rounded-full mr-1 sm:mr-2 flex-shrink-0 animate-pulse`}
                    ></div>
                    <span className="truncate">{location.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Footer Message */}
        <div
          className={`text-center mt-4 sm:mt-6 lg:mt-8 px-4 transform transition-all duration-1000 delay-1400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-xs sm:text-sm text-gray-500">
            🌍 Global expansion coming soon. Stay tuned for partnership announcements! ✨
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
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
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Global
