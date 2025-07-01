import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function StepFamilySocioEconomic({ formData, onChange, errors = {} }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <ShieldCheck className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Family & Socio-Economic</h2>
        <p className="text-gray-600 mt-2">Your family and background details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Father's Occupation *</label><input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.fatherOccupation && <div className="text-xs text-red-600 mt-1">{errors.fatherOccupation}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Mother's Occupation *</label><input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.motherOccupation && <div className="text-xs text-red-600 mt-1">{errors.motherOccupation}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Combined Annual Income (INR) *</label><input type="number" name="combinedIncome" value={formData.combinedIncome} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.combinedIncome && <div className="text-xs text-red-600 mt-1">{errors.combinedIncome}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Category *</label><select name="category" value={formData.category} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required><option value="">Select Category</option><option value="sc">SC</option><option value="st">ST</option><option value="obc">OBC</option><option value="ews">EWS</option><option value="general">General</option></select>{errors.category && <div className="text-xs text-red-600 mt-1">{errors.category}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Do you receive any other scholarship? *</label><select name="otherScholarship" value={formData.otherScholarship} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required><option value="">Select</option><option value="no">No</option><option value="yes">Yes</option></select>{errors.otherScholarship && <div className="text-xs text-red-600 mt-1">{errors.otherScholarship}</div>}</div>
        {formData.otherScholarship === 'yes' && (
          <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Other Scholarship Details *</label><input type="text" name="otherScholarshipDetails" value={formData.otherScholarshipDetails} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.otherScholarshipDetails && <div className="text-xs text-red-600 mt-1">{errors.otherScholarshipDetails}</div>}</div>
        )}
      </div>
    </motion.div>
  );
} 