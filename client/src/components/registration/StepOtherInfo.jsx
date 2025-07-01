import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export default function StepOtherInfo({ formData, onChange, errors = {} }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <Info className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Other Information</h2>
        <p className="text-gray-600 mt-2">Help us know you better</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us? *</label><input type="text" name="howDidYouHear" value={formData.howDidYouHear} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.howDidYouHear && <div className="text-xs text-red-600 mt-1">{errors.howDidYouHear}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Why do you need this scholarship? *</label><textarea name="scholarshipReason" value={formData.scholarshipReason} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none" rows={3} required />{errors.scholarshipReason && <div className="text-xs text-red-600 mt-1">{errors.scholarshipReason}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Do you have any disability? *</label><select name="disability" value={formData.disability} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required><option value="">Select</option><option value="no">No</option><option value="yes">Yes</option></select>{errors.disability && <div className="text-xs text-red-600 mt-1">{errors.disability}</div>}</div>
      </div>
    </motion.div>
  );
} 