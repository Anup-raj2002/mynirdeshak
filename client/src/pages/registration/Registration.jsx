import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationStepper from '../../components/registration/RegistrationStepper';
import StepPersonalDetails from '../../components/registration/StepPersonalDetails';
import StepFamilySocioEconomic from '../../components/registration/StepFamilySocioEconomic';
import StepCareerAcademic from '../../components/registration/StepCareerAcademic';
import StepAddress from '../../components/registration/StepAddress';
import StepUploads from '../../components/registration/StepUploads';
import StepOtherInfo from '../../components/registration/StepOtherInfo';
import StepDeclarationPayment from '../../components/registration/StepDeclarationPayment';
import {
  User, GraduationCap, FileText, MapPin, Image as ImageIcon, Info, ShieldCheck
} from 'lucide-react';

export const LOCAL_STORAGE_KEY = 'registrationFormDataV2';
export const LOCAL_STORAGE_STEP_KEY = 'registrationCurrentStepV2';

const initialFormData = {
  // Step 1: Personal Details
  name: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: '',
  email: '',
  phone: '',
  altPhone: '',
  fatherEmail: '',
  // Step 2: Family & Socio-Economic
  fatherOccupation: '',
  motherOccupation: '',
  combinedIncome: '',
  category: '',
  otherScholarship: '', // yes/no
  otherScholarshipDetails: '',
  // Step 3: Career & Academic
  careerGoal: '',
  careerGoalOther: '',
  classPassed: '',
  yearOfPassing: '',
  board: '',
  school: '',
  stream: '',
  // Step 4: Address
  address: '',
  district: '',
  city: '',
  state: '',
  pinCode: '',
  // Step 5: Uploads (files)
  passportPhoto: null,
  signaturePhoto: null,
  idProofPhoto: null,
  schoolIdPhoto: null,
  marksheet10Photo: null,
  marksheet12Photo: null,
  // Step 6: Other Info
  howDidYouHear: '',
  scholarshipReason: '',
  disability: '',
  // Step 7: Declaration
  allDetailsCorrect: false,
  acknowledgment: false,
};

const stepTitles = [
  'Personal Details',
  'Family & Socio-Economic',
  'Career & Academic',
  'Address',
  'Uploads',
  'Other Info',
  'Declaration & Payment',
];

const stepIcons = [User, ShieldCheck, GraduationCap, MapPin, ImageIcon, Info, FileText];

const stepComponents = [
  StepPersonalDetails,
  StepFamilySocioEconomic,
  StepCareerAcademic,
  StepAddress,
  StepUploads,
  StepOtherInfo,
  StepDeclarationPayment,
];

// Add validation helpers
const phoneRegex = /^[6-9]\d{9}$/;
const pinCodeRegex = /^[1-9][0-9]{5}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Registration = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [triedNext, setTriedNext] = useState(false);
  const [fileErrors, setFileErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedStep = localStorage.getItem(LOCAL_STORAGE_STEP_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({ ...initialFormData, ...parsed });
      } catch (e) {
        setFormData(initialFormData);
      }
    }
    if (savedStep) setCurrentStep(Number(savedStep));
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, hasLoaded]);
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(LOCAL_STORAGE_STEP_KEY, currentStep);
    }
  }, [currentStep, hasLoaded]);

  // File to base64 helper
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Unified onChange handler
  const handleInputChange = useCallback(async (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) { // 2MB
          setFileErrors((prev) => ({ ...prev, [name]: 'File size must be less than 2MB' }));
          setFormData((prev) => ({ ...prev, [name]: '' }));
          return;
        } else {
          setFileErrors((prev) => ({ ...prev, [name]: undefined }));
        }
        const base64 = await fileToBase64(file);
        setFormData((prev) => ({ ...prev, [name]: base64 }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: '' }));
      }
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  // Step validation (with phone and pin code validation)
  function getStepErrors(step) {
    let stepErrors = {};
    switch (step) {
      case 0:
        if (!formData.name) stepErrors.name = 'Name is required';
        if (!formData.fatherName) stepErrors.fatherName = 'Father name is required';
        if (!formData.motherName) stepErrors.motherName = 'Mother name is required';
        if (!formData.dob) stepErrors.dob = 'Date of birth is required';
        if (!formData.gender) stepErrors.gender = 'Gender is required';
        if (!formData.email) stepErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) stepErrors.email = 'Enter a valid email address';
        if (!formData.phone) stepErrors.phone = 'Phone is required';
        else if (!phoneRegex.test(formData.phone)) stepErrors.phone = 'Enter a valid 10-digit phone number starting with 6-9';
        // Optional: altPhone
        if (formData.altPhone && !phoneRegex.test(formData.altPhone)) stepErrors.altPhone = 'Enter a valid 10-digit phone number starting with 6-9';
        if (!formData.fatherEmail) stepErrors.fatherEmail = 'Father email is required';
        else if (!emailRegex.test(formData.fatherEmail)) stepErrors.fatherEmail = 'Enter a valid email address';
        break;
      case 1:
        if (!formData.fatherOccupation) stepErrors.fatherOccupation = 'Father occupation is required';
        if (!formData.motherOccupation) stepErrors.motherOccupation = 'Mother occupation is required';
        if (!formData.combinedIncome) stepErrors.combinedIncome = 'Combined income is required';
        if (!formData.category) stepErrors.category = 'Category is required';
        if (!formData.otherScholarship) stepErrors.otherScholarship = 'Please select if you receive other scholarship';
        if (formData.otherScholarship === 'yes' && !formData.otherScholarshipDetails) stepErrors.otherScholarshipDetails = 'Please provide details';
        break;
      case 2:
        if (!formData.careerGoal) stepErrors.careerGoal = 'Career goal is required';
        if (formData.careerGoal === 'other' && !formData.careerGoalOther) stepErrors.careerGoalOther = 'Please specify other career goal';
        if (!formData.classPassed) stepErrors.classPassed = 'Class passed is required';
        if (!formData.yearOfPassing) stepErrors.yearOfPassing = 'Year of passing is required';
        if (!formData.board) stepErrors.board = 'Board is required';
        if (!formData.school) stepErrors.school = 'School is required';
        if (!formData.stream) stepErrors.stream = 'Stream is required';
        break;
      case 3:
        if (!formData.address) stepErrors.address = 'Address is required';
        if (!formData.district) stepErrors.district = 'District is required';
        if (!formData.city) stepErrors.city = 'City is required';
        if (!formData.state) stepErrors.state = 'State is required';
        if (!formData.pinCode) stepErrors.pinCode = 'Pin code is required';
        else if (!pinCodeRegex.test(formData.pinCode)) stepErrors.pinCode = 'Enter a valid 6-digit pin code (not starting with 0)';
        break;
      case 4:
        if (!formData.passportPhoto) stepErrors.passportPhoto = 'Passport photo is required';
        if (!formData.signaturePhoto) stepErrors.signaturePhoto = 'Signature photo is required';
        if (!formData.idProofPhoto) stepErrors.idProofPhoto = 'ID proof photo is required';
        if (!formData.schoolIdPhoto) stepErrors.schoolIdPhoto = 'School ID photo is required';
        if (!formData.marksheet10Photo) stepErrors.marksheet10Photo = '10th marksheet photo is required';
        if (formData.classPassed === '12' && !formData.marksheet12Photo) stepErrors.marksheet12Photo = '12th marksheet photo is required';
        break;
      case 5:
        if (!formData.howDidYouHear) stepErrors.howDidYouHear = 'This field is required';
        if (!formData.scholarshipReason) stepErrors.scholarshipReason = 'This field is required';
        if (formData.disability === '') stepErrors.disability = 'Please select disability status';
        break;
      case 6:
        if (!formData.allDetailsCorrect) stepErrors.allDetailsCorrect = 'You must confirm details are correct';
        if (!formData.acknowledgment) stepErrors.acknowledgment = 'You must acknowledge the rules';
        break;
      default:
        break;
    }
    return stepErrors;
  }

  // Always recalculate errors on formData or currentStep change
  useEffect(() => {
    setErrors(getStepErrors(currentStep));
  }, [formData, currentStep]);

  const isStepValid = Object.keys(errors).length === 0 && Object.values(fileErrors).every((v) => !v);

  const StepComponent = stepComponents[currentStep];

  // Navigation handlers
  const goNext = () => {
    setTriedNext(true);
    if (isStepValid) {
      setCurrentStep(s => Math.min(stepTitles.length - 1, s + 1));
      setTriedNext(false); // reset for next step
    }
  };
  const goPrev = () => {
    setCurrentStep(s => Math.max(0, s - 1));
    setTriedNext(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-4">
      <div className="w-full px-2 sm:px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Student Registration</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Begin your journey towards educational excellence. Complete the registration to be eligible for our scholarship program.</p>
        </motion.div>
        <RegistrationStepper stepTitles={stepTitles} stepIcons={stepIcons} currentStep={currentStep} />
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="bg-white rounded-3xl shadow-2xl p-4 md:p-8 lg:p-12 w-full">
          <form onSubmit={e => e.preventDefault()}>
            <AnimatePresence mode="wait">
              <StepComponent key={currentStep} formData={formData} onChange={handleInputChange} errors={triedNext ? errors : {}} fileErrors={fileErrors} />
            </AnimatePresence>
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <motion.button whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }} whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }} type="button" onClick={goPrev} className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${currentStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} disabled={currentStep === 0}><span>Previous</span></motion.button>
              {currentStep < stepTitles.length - 1 ? (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={goNext} disabled={!isStepValid} className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"><span>Next</span></motion.button>
              ) : null}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;