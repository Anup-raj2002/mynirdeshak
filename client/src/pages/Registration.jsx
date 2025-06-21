import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, School, FileText, CheckCircle, ArrowRight, ArrowLeft, MapPin, Trophy } from 'lucide-react';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    stream: '',
    rollNo: '',
    jeeScore: '',
    board: '',
    marks12th: '',
    address: '',
    preferredCollege1: '',
    preferredCollege2: '',
    preferredCollege3: '',
    fatherName: '',
    termsAccepted: false
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration submitted:', formData);
      alert('Registration submitted successfully! You will receive a confirmation email shortly.');
      setIsSubmitting(false);
    }, 2000);
  };

  const stepTitles = [
    'Personal Information',
    'Academic Details', 
    'College Preferences',
    'Terms & Submit'
  ];

  const stepIcons = [User, GraduationCap, School, FileText];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl w-fit mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600 mt-2">Tell us about yourself</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Father's Name *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter father's name"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Enter your complete address with city, state, and pincode"
                  rows={4}
                  required
                />
              </div>
            </div>
          </motion.div>
        );
      
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl w-fit mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
              <p className="text-gray-600 mt-2">Your educational background</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stream *
                </label>
                <select
                  name="stream"
                  value={formData.stream}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  <option value="">Select Stream</option>
                  <option value="science-pcm">Science (PCM)</option>
                  <option value="science-pcb">Science (PCB)</option>
                  <option value="science-pcmb">Science (PCMB)</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts/Humanities</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number *
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your 12th grade roll number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JEE Score
                </label>
                <input
                  type="number"
                  name="jeeScore"
                  value={formData.jeeScore}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter JEE score (if applicable)"
                  min="0"
                  max="300"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if not applicable</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board *
                </label>
                <select
                  name="board"
                  value={formData.board}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  <option value="">Select Board</option>
                  <option value="cbse">CBSE</option>
                  <option value="icse">ICSE</option>
                  <option value="state-board">State Board</option>
                  <option value="ib">International Baccalaureate (IB)</option>
                  <option value="cambridge">Cambridge International</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  12th Grade Marks (%) *
                </label>
                <input
                  type="number"
                  name="marks12th"
                  value={formData.marks12th}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your 12th grade percentage"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-2xl w-fit mx-auto mb-4">
                <School className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">College Preferences</h2>
              <p className="text-gray-600 mt-2">Choose your preferred colleges</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <Trophy className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-900">Preferred Colleges</h3>
                </div>
                <p className="text-blue-700 text-sm mb-4">
                  Please list your top 3 college preferences in order of priority. This will help us understand your educational goals.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1st Preference College *
                  </label>
                  <input
                    type="text"
                    name="preferredCollege1"
                    value={formData.preferredCollege1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your first choice college name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2nd Preference College *
                  </label>
                  <input
                    type="text"
                    name="preferredCollege2"
                    value={formData.preferredCollege2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your second choice college name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    3rd Preference College *
                  </label>
                  <input
                    type="text"
                    name="preferredCollege3"
                    value={formData.preferredCollege3}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your third choice college name"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-2xl w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
              <p className="text-gray-600 mt-2">Please review and accept our terms</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Track Your Way - Terms & Conditions</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <p><strong>1. Eligibility:</strong> Only students who have completed 12th grade from a recognized board are eligible to apply.</p>
                <p><strong>2. Examination:</strong> All registered students must appear for the online examination conducted by Track Your Way.</p>
                <p><strong>3. College Admission:</strong> Scholarship will only be disbursed after the student secures admission in a recognized college.</p>
                <p><strong>4. Ranking System:</strong> Students will be ranked based on their examination performance and academic records.</p>
                <p><strong>5. Scholarship Distribution:</strong> Scholarships will be distributed as per the announced structure and directly paid to the college for fee purposes.</p>
                <p><strong>6. Documentation:</strong> Students must provide all required documents including mark sheets, admission letters, and ID proofs.</p>
                <p><strong>7. Fair Play:</strong> Any form of cheating or fraudulent activity will result in immediate disqualification.</p>
                <p><strong>8. Privacy:</strong> All personal information will be kept confidential and used only for scholarship-related purposes.</p>
                <p><strong>9. Changes:</strong> Track Your Way reserves the right to modify these terms and conditions with prior notice.</p>
                <p><strong>10. Disputes:</strong> Any disputes will be resolved through mutual discussion and legal procedures if necessary.</p>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
            >
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I have read and agree to all the terms and conditions mentioned above. 
                  I understand that providing false information may lead to disqualification 
                  from the scholarship program. I consent to the processing of my personal 
                  data for scholarship evaluation purposes.
                </span>
              </label>
            </motion.div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Student Registration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Begin your journey towards educational excellence. Complete the registration 
            to be eligible for our scholarship program.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            {stepTitles.map((title, index) => {
              const IconComponent = stepIcons[index];
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-400 bg-white'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <IconComponent className="h-6 w-6" />
                    )}
                  </motion.div>
                  <span className={`text-sm font-medium text-center ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                  <span className={`text-xs mt-1 ${
                    isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    Step {index}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                type="button"
                onClick={prevStep}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Previous</span>
              </motion.button>

              {currentStep === totalSteps - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!formData.termsAccepted || isSubmitting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <CheckCircle className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-6">
            If you face any issues during registration, please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@trackyourway.com"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              support@trackyourway.com
            </a>
            <a
              href="tel:+911234567890"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              +91 12345 67890
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;