"use client"
import { motion } from "framer-motion"
import { UserPlus, FileText, PenTool, Award, GraduationCap, CreditCard, CheckCircle } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Register",
      description: "Create your account and complete your profile with academic details and personal information.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FileText,
      title: "Accept Terms",
      description: "Read and agree to our terms and conditions for scholarship eligibility and program participation.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: PenTool,
      title: "Take Exam",
      description: "Appear for our comprehensive online examination to demonstrate your knowledge and skills.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      title: "Receive Ranking",
      description: "Get ranked based on your exam performance, academic records, and overall profile assessment.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: GraduationCap,
      title: "Get Admission",
      description: "Secure admission in a recognized college or university for your chosen field of study.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: CreditCard,
      title: "Get Scholarship",
      description:
        "Receive your scholarship amount directly transferred for college fee payment and educational expenses.",
      color: "from-yellow-500 to-yellow-600",
    },
  ]

  const eligibilityCriteria = [
    {
      title: "Only Valid for Private or Direct Admission Colleges",
      description: "Scholarships apply only to colleges that accept direct admissions.",
      reason: "Such colleges accept third-party fee transfers.",
      purpose: "Ensures proper coordination and safe scholarship usage.",
    },
    {
      title: "Not Valid for Government or Counseling-Based Admissions",
      description: "Students admitted through online counseling or merit based quotas are not eligible.",
      reason: "These platforms don't allow external financial intervention.",
      purpose: "Prevents legal issues or fund rejections.",
    },
    {
      title: "No Support for Government Institutions",
      description: "Scholarships won't be offered for government college admissions.",
      reason: "Such colleges already provide fee subsidies.",
      purpose: "Funds are prioritized for students paying higher fees.",
    },
    {
      title: "Must Be a Full-Time Undergraduate Degree",
      description: "Only regular bachelor's programs like B.A., B.Com., B.Tech, etc., are eligible.",
      reason: "Distance or part-time courses are excluded.",
      purpose: "Focuses on long-term career-building programs.",
    },
    {
      title: "College Must Be UGC/AICTE Approved",
      description: "Scholarships are applicable only for colleges approved by UGC or AICTE.",
      reason: "Avoids fund misuse at unrecognized institutions.",
      purpose: "Protects students from fake or low-quality education.",
    },
    {
      title: "Scholarship Not Available for Diploma or Religious Courses",
      description: "Specialized, non-career-oriented programs are excluded.",
      reason: "Scholarships should go to mainstream higher education.",
      purpose: "Helps students build strong career foundations.",
    },
    {
      title: "Must Have 60% or More in Class 12",
      description: "A minimum of 60% in the Class 12 board exams is required.",
      reason: "Maintains academic standards.",
      purpose: "Recognizes students who have shown consistent performance.",
    },
  ]

  return (
    <div className="min-h-screen py-6 md:py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              How It Works
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Our streamlined process ensures fair and transparent scholarship distribution based on merit and academic
              excellence. Follow these simple steps to begin your journey.
            </p>
          </motion.div>

          {/* Process Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line - Hidden on mobile */}
            <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 via-orange-200 via-red-200 to-yellow-200 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="relative group"
                  >
                    {/* Step Number */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-10 md:h-10 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-gray-600 group-hover:border-blue-500 group-hover:text-blue-600 transition-all duration-300 z-10 shadow-lg"
                    >
                      {index + 1}
                    </motion.div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full"
                    >
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`bg-gradient-to-br ${step.color} p-3 md:p-4 rounded-xl md:rounded-2xl w-fit mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{step.title}</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria Section */}
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
              Eligibility Criteria for Scholarship
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6 md:mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 md:p-4 rounded-xl md:rounded-2xl mr-3 md:mr-4">
                  <CheckCircle className="h-5 w-5 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">Eligibility Criteria for Scholarship</h3>
              </div>

              <div className="space-y-4 md:space-y-8">
                {eligibilityCriteria.map((criteria, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-blue-200 pl-3 md:pl-6 py-2 md:py-4 hover:border-blue-400 transition-colors duration-300"
                  >
                    <div className="flex items-start mb-3 md:mb-4">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <h4 className="font-bold text-gray-900 text-sm md:text-lg leading-tight">{criteria.title}</h4>
                    </div>

                    <div className="ml-6 md:ml-10 space-y-2 md:space-y-3">
                      <div className="grid grid-cols-1 gap-1">
                        <div className="flex items-start">
                          <span className="text-blue-600 font-semibold text-xs md:text-sm w-20 md:w-24 flex-shrink-0">
                            What It Means:
                          </span>
                          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{criteria.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        <div className="flex items-start">
                          <span className="text-green-600 font-semibold text-xs md:text-sm w-20 md:w-24 flex-shrink-0">
                            Why?:
                          </span>
                          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{criteria.reason}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        <div className="flex items-start">
                          <span className="text-purple-600 font-semibold text-xs md:text-sm w-20 md:w-24 flex-shrink-0">
                            Purpose:
                          </span>
                          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{criteria.purpose}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Get answers to common questions about our process
            </p>
          </motion.div>
          <div className="space-y-4 md:space-y-6">
            {[
              {
                question: "When is the registration deadline?",
                answer:
                  "Registration is open year-round. However, exam dates are announced quarterly with specific registration cutoffs for each examination cycle.",
              },
              {
                question: "What subjects are covered in the examination?",
                answer:
                  "The examination covers general aptitude, logical reasoning, basic mathematics, English comprehension, and subject-specific questions based on your 12th grade stream.",
              },
              {
                question: "How is the scholarship amount disbursed?",
                answer:
                  "Scholarships are directly paid to your college for fee purposes after verification of admission. The amount is transferred within 2-3 business days of verification.",
              },
              {
                question: "Can I retake the examination if I'm not satisfied with my score?",
                answer:
                  "Yes, you can retake the examination in the next cycle. However, only your highest score will be considered for scholarship evaluation.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">{faq.question}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
