import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, PenTool, Award, GraduationCap, CreditCard, CheckCircle, Clock } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register',
      description: 'Create your account and complete your profile with academic details and personal information.',
      color: 'from-blue-500 to-blue-600',
      duration: '5 minutes'
    },
    {
      icon: FileText,
      title: 'Accept Terms',
      description: 'Read and agree to our terms and conditions for scholarship eligibility and program participation.',
      color: 'from-green-500 to-green-600',
      duration: '2 minutes'
    },
    {
      icon: PenTool,
      title: 'Take Exam',
      description: 'Appear for our comprehensive online examination to demonstrate your knowledge and skills.',
      color: 'from-purple-500 to-purple-600',
      duration: '2 hours'
    },
    {
      icon: GraduationCap,
      title: 'Get Admission',
      description: 'Secure admission in a recognized college or university for your chosen field of study.',
      color: 'from-orange-500 to-orange-600',
      duration: 'Varies'
    },
    {
      icon: Award,
      title: 'Receive Ranking',
      description: 'Get ranked based on your exam performance, academic records, and overall profile assessment.',
      color: 'from-red-500 to-red-600',
      duration: '1 week'
    },
    {
      icon: CreditCard,
      title: 'Get Scholarship',
      description: 'Receive your scholarship amount directly transferred for college fee payment and educational expenses.',
      color: 'from-yellow-500 to-yellow-600',
      duration: '2-3 days'
    }
  ];

  const requirements = [
    {
      category: 'Eligibility Criteria',
      items: [
        'Completed 12th grade from a recognized board',
        'Planning to pursue higher education in college',
        'Must appear for the online examination',
        'Must secure college admission before scholarship disbursement'
      ],
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600'
    },
    {
      category: 'Required Documents',
      items: [
        '12th grade mark sheet and certificate',
        'College admission letter (after securing admission)',
        'Government-issued photo ID proof',
        'Bank account details for scholarship transfer'
      ],
      icon: FileText,
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How It Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our streamlined process ensures fair and transparent scholarship distribution 
              based on merit and academic excellence. Follow these simple steps to begin your journey.
            </p>
          </motion.div>

          {/* Process Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 via-orange-200 via-red-200 to-yellow-200 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
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
                      className="absolute -top-4 -left-4 w-10 h-10 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 group-hover:border-blue-500 group-hover:text-blue-600 transition-all duration-300 z-10 shadow-lg"
                    >
                      {index + 1}
                    </motion.div>
                    
                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full"
                    >
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`bg-gradient-to-br ${step.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </motion.div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      {/* Duration */}
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Duration: {step.duration}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
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
              Important Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please ensure you meet these criteria and have the required documents before applying
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {requirements.map((req, index) => {
              const IconComponent = req.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center mb-6">
                    <div className={`bg-gradient-to-r ${req.color} p-3 rounded-xl mr-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {req.category}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {req.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + itemIndex * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-start text-gray-600"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our process
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "When is the registration deadline?",
                answer: "Registration is open year-round. However, exam dates are announced quarterly with specific registration cutoffs for each examination cycle."
              },
              {
                question: "What subjects are covered in the examination?",
                answer: "The examination covers general aptitude, logical reasoning, basic mathematics, English comprehension, and subject-specific questions based on your 12th grade stream."
              },
              {
                question: "How is the scholarship amount disbursed?",
                answer: "Scholarships are directly paid to your college for fee purposes after verification of admission. The amount is transferred within 2-3 business days of verification."
              },
              {
                question: "Can I retake the examination if I'm not satisfied with my score?",
                answer: "Yes, you can retake the examination in the next cycle. However, only your highest score will be considered for scholarship evaluation."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;