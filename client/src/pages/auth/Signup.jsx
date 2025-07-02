import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { signupWithEmail, logout } from '../../api/auth';
import { useNotification } from '../../contexts/NotificationContext';
import SignupStepper from '../../components/signup/SignupStepper';
import SignupStepPersonalDetails from '../../components/signup/SignupStepPersonalDetails';
import SignupStepAccountDetails from '../../components/signup/SignupStepAccountDetails';

const initialFormData = {
  name: '',
  phone: '',
  dob: '',
  fatherName: '',
  motherName: '',
  altPhone: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
};

const Signup = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation logic for each step
  function getStepErrors(step) {
    const stepErrors = {};
    if (step === 0) {
      if (!formData.name) stepErrors.name = 'Name is required';
      if (!formData.phone) stepErrors.phone = 'Phone is required';
      else if (!/^\d{10}$/.test(formData.phone)) stepErrors.phone = 'Enter a valid 10-digit phone number';
      if (!formData.dob) stepErrors.dob = 'Date of birth is required';
      if (!formData.fatherName) stepErrors.fatherName = 'Father name is required';
      if (!formData.motherName) stepErrors.motherName = 'Mother name is required';
      if (formData.altPhone && !/^\d{10}$/.test(formData.altPhone)) stepErrors.altPhone = 'Enter a valid 10-digit phone number';
    } else if (step === 1) {
      if (!formData.email) stepErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) stepErrors.email = 'Enter a valid email address';
      if (!formData.password) stepErrors.password = 'Password is required';
      if (!formData.confirmPassword) stepErrors.confirmPassword = 'Confirm your password';
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) stepErrors.confirmPassword = 'Passwords do not match';
      if (!formData.agreeToTerms) stepErrors.agreeToTerms = 'You must agree to the Terms & Conditions';
    }
    return stepErrors;
  }

  useEffect(() => {
    setErrors(getStepErrors(currentStep));
  }, [formData, currentStep]);

  const isStepValid = Object.keys(errors).length === 0;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const goNext = () => {
    if (isStepValid) setCurrentStep((s) => Math.min(1, s + 1));
  };
  const goPrev = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid) return;
    setIsLoading(true);
    try {
      await signupWithEmail(formData.email, formData.password, formData);
      await logout();
      queryClient.removeQueries();
      navigate('/login', { replace: true });
      localStorage.removeItem('postLoginRedirect');
      showNotification('Please verify your mail', 'success');
    } catch (err) {
      showNotification(err.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Heading and Subheading at the top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community!</h2>
              <p className="text-gray-600 text-lg">
                Start your educational journey with thousands of other students
              </p>
            </motion.div>
            {/* Vector Illustration */}
            <svg viewBox="0 0 500 400" className="w-full h-auto">
              <defs>
                <linearGradient id="signupGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="signupGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              
              {/* Background Elements */}
              <motion.circle
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.5, duration: 2 }}
                cx="80" cy="80" r="40" fill="url(#signupGrad1)" opacity="0.2"
              />
              <motion.circle
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: -360 }}
                transition={{ delay: 0.7, duration: 2 }}
                cx="420" cy="320" r="60" fill="url(#signupGrad2)" opacity="0.2"
              />
              
              {/* Main Illustration - Student with Books */}
              <motion.rect
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                x="180" y="120" width="140" height="180" rx="70" fill="url(#signupGrad1)" opacity="0.8"
              />
              
              {/* Books */}
              <motion.rect
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                x="120" y="250" width="80" height="12" rx="6" fill="url(#signupGrad2)"
              />
              <motion.rect
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                x="300" y="250" width="80" height="12" rx="6" fill="url(#signupGrad1)"
              />
              
              {/* Graduation Cap */}
              <motion.polygon
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                points="220,100 280,100 250,80"
                fill="url(#signupGrad2)"
              />
              
              {/* Success Elements */}
              <motion.circle
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                cx="350" cy="150" r="20" fill="#10B981"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                d="M340,150 L348,158 L360,142"
                stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Right Side - Signup Card with Stepper */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
        >
          <SignupStepper currentStep={currentStep} />
          <form onSubmit={currentStep === 1 ? handleFormSubmit : (e) => e.preventDefault()} className="space-y-6 mt-8">
            {currentStep === 0 ? (
              <SignupStepPersonalDetails formData={formData} onChange={handleInputChange} errors={errors} />
            ) : (
              <SignupStepAccountDetails formData={formData} onChange={handleInputChange} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />
            )}
            <div className="flex justify-between mt-8">
              <button type="button" onClick={goPrev} disabled={currentStep === 0} className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${currentStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Previous</button>
              {currentStep < 1 ? (
                <button type="button" onClick={goNext} disabled={!isStepValid} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
              ) : (
                <button type="submit" disabled={!isStepValid || isLoading} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
              )}
            </div>
          </form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;