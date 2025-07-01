"use client"
import { motion } from "framer-motion"
import { Trophy, Medal, Award, Gift, Star, Users, TrendingUp, DollarSign } from "lucide-react"

const Scholarships = () => {
  const topRanks = [
    {
      icon: Trophy,
      rank: "1st Rank",
      amount: "₹1,00,000",
      description: "The highest achiever receives our premium scholarship for outstanding performance",
      gradient: "from-yellow-400 via-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      iconBg: "from-yellow-100 to-yellow-200",
      position: "center",
    },
    {
      icon: Medal,
      rank: "2nd Rank",
      amount: "₹75,000",
      description: "Recognizing exceptional academic performance and dedication to excellence",
      gradient: "from-gray-300 via-gray-400 to-gray-500",
      bgGradient: "from-gray-50 to-slate-50",
      iconBg: "from-gray-100 to-gray-200",
      position: "left",
    },
    {
      icon: Award,
      rank: "3rd Rank",
      amount: "₹50,000",
      description: "Celebrating outstanding dedication to studies and academic achievement",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "from-emerald-100 to-teal-200",
      position: "right",
    },
  ]

  const groupRanks = [
    {
      icon: Star,
      group: "Next 20%",
      amount: "₹10,000",
      description: "High-performing students in the top percentile showing exceptional promise",
      students: "each student",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: Gift,
      group: "Next 40%",
      amount: "₹7,500",
      description: "Above-average performers showing strong potential and commitment",
      students: "each student",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Users,
      group: "Next 40%",
      amount: "₹5,000",
      description: "All eligible students receive support for their educational journey",
      students: "each student",
      color: "from-green-500 to-emerald-600",
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "100% Merit-Based",
      description: "Fair evaluation based purely on academic performance and examination scores",
    },
    {
      icon: TrendingUp,
      title: "Direct Payment",
      description: "Scholarship amount paid directly to your college for fee purposes",
    },
    {
      icon: Star,
      title: "No Hidden Charges",
      description: "Completely free registration and examination process for all students",
    },
  ]

  return (
    <div className="min-h-screen py-6 md:py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              Scholarship Structure
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Our comprehensive merit-based scholarship system ensures that every deserving student receives financial
              support based on their academic performance and potential.
            </p>
          </motion.div>

          {/* Top 3 Ranks - Mobile Responsive Podium */}
          <div className="mb-12 md:mb-20">
            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-4 md:gap-8 max-w-6xl mx-auto">
              {/* Mobile: Stack all cards vertically, Desktop: Podium layout */}

              {/* 1st Place - Always prominent */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-gradient-to-br ${topRanks[0].bgGradient} rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-yellow-200 group overflow-hidden w-full max-w-sm lg:max-w-md order-1 lg:order-2 lg:transform lg:scale-110`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-16 h-16 md:w-24 md:h-24 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 md:w-20 md:h-20 bg-current rounded-full"></div>
                </div>

                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className={`bg-gradient-to-br ${topRanks[0].iconBg} p-3 md:p-5 rounded-xl md:rounded-2xl w-fit mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Trophy className="h-10 w-10 md:h-14 md:w-14 text-yellow-600" />
                  </motion.div>
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{topRanks[0].rank}</h3>
                  <div
                    className={`text-3xl md:text-5xl font-bold bg-gradient-to-r ${topRanks[0].gradient} bg-clip-text text-transparent mb-3 md:mb-4`}
                  >
                    {topRanks[0].amount}
                  </div>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed">{topRanks[0].description}</p>
                </div>
              </motion.div>

              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-gradient-to-br ${topRanks[1].bgGradient} rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 group overflow-hidden w-full max-w-sm order-2 lg:order-1 lg:mb-8`}
              >
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 bg-current rounded-full"></div>
                </div>

                <div className="relative z-10 text-center">
                  <div
                    className={`bg-gradient-to-br ${topRanks[1].iconBg} p-3 md:p-4 rounded-xl md:rounded-2xl w-fit mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Medal className="h-8 w-8 md:h-12 md:w-12 text-gray-700" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">{topRanks[1].rank}</h3>
                  <div
                    className={`text-2xl md:text-4xl font-bold bg-gradient-to-r ${topRanks[1].gradient} bg-clip-text text-transparent mb-3 md:mb-4`}
                  >
                    {topRanks[1].amount}
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{topRanks[1].description}</p>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-gradient-to-br ${topRanks[2].bgGradient} rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 group overflow-hidden w-full max-w-sm order-3 lg:mb-16`}
              >
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 bg-current rounded-full"></div>
                </div>

                <div className="relative z-10 text-center">
                  <div
                    className={`bg-gradient-to-br ${topRanks[2].iconBg} p-3 md:p-4 rounded-xl md:rounded-2xl w-fit mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Award className="h-8 w-8 md:h-12 md:w-12 text-emerald-700" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">{topRanks[2].rank}</h3>
                  <div
                    className={`text-2xl md:text-4xl font-bold bg-gradient-to-r ${topRanks[2].gradient} bg-clip-text text-transparent mb-3 md:mb-4`}
                  >
                    {topRanks[2].amount}
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{topRanks[2].description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Rankings */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              Group-wise Distribution
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Every student receives support based on their performance percentile
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {groupRanks.map((group, index) => {
              const IconComponent = group.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`bg-gradient-to-r ${group.color} p-3 md:p-4 rounded-xl md:rounded-2xl w-fit mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{group.group}</h3>

                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    {group.amount}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 font-medium">{group.students}</div>

                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{group.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              Why Choose Our Scholarships?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Transparent, fair, and designed to support your educational journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 md:p-4 rounded-xl md:rounded-2xl w-fit mx-auto mb-4 md:mb-6">
                    <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Total Impact */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-2">Total Scholarship Pool</h2>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 text-yellow-300"
            >
              ₹2cr+ Lakhs
            </motion.div>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
              Every year, we aim to distribute over 2 crores in scholarships to deserving students, making higher
              education dreams a reality across the nation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                { value: "100%", label: "Merit-Based Selection" },
                { value: "Direct", label: "College Fee Payment" },
                { value: "Zero", label: "Hidden Charges" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Scholarships
