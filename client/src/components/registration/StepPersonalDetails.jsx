import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function StepPersonalDetails({ formData, onChange, errors = {} }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <User className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
        <p className="text-gray-600 mt-2">Tell us about yourself</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label><input type="text" name="name" value={formData.name} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Father's Name *</label><input type="text" name="fatherName" value={formData.fatherName} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.fatherName && <div className="text-xs text-red-600 mt-1">{errors.fatherName}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Mother's Name *</label><input type="text" name="motherName" value={formData.motherName} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.motherName && <div className="text-xs text-red-600 mt-1">{errors.motherName}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label><input type="date" name="dob" value={formData.dob} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.dob && <div className="text-xs text-red-600 mt-1">{errors.dob}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label><select name="gender" value={formData.gender} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required><option value="">Select Gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select>{errors.gender && <div className="text-xs text-red-600 mt-1">{errors.gender}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Email *</label><input type="email" name="email" value={formData.email} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label><input type="tel" name="phone" value={formData.phone} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.phone && <div className="text-xs text-red-600 mt-1">{errors.phone}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Alternative Phone Number</label><input type="tel" name="altPhone" value={formData.altPhone} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Father's Email ID *</label><input type="email" name="fatherEmail" value={formData.fatherEmail} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.fatherEmail && <div className="text-xs text-red-600 mt-1">{errors.fatherEmail}</div>}</div>
      </div>
    </motion.div>
  );
} 