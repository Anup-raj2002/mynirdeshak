import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function StepDeclarationPayment({ formData, onChange }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Declaration & Payment</h2>
        <p className="text-gray-600 mt-2">Please review and accept our terms</p>
      </div>
      <div className="bg-gray-50 rounded-2xl p-6 max-h-96 overflow-y-auto mb-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Rules & Guidelines</h3>
        <div className="space-y-4 text-sm text-gray-700">
          <p>1. All information provided must be true and correct to the best of your knowledge.</p>
          <p>2. Any false information may lead to disqualification.</p>
          <p>3. Please read the full rules and guidelines on our <a href="/terms" target="_blank" className="text-blue-600 underline">Rules & Guidelines</a> page.</p>
          <p>4. By submitting, you agree to our terms and privacy policy.</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 mb-4">
        <input type="checkbox" name="allDetailsCorrect" checked={formData.allDetailsCorrect} onChange={onChange} className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
        <span className="text-sm text-gray-700 leading-relaxed">I confirm that all the details provided are correct to the best of my knowledge.</span>
      </div>
      <div className="flex items-start space-x-3 mb-4">
        <input type="checkbox" name="acknowledgment" checked={formData.acknowledgment} onChange={onChange} className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
        <span className="text-sm text-gray-700 leading-relaxed">I have read and agree to the rules, guidelines, and privacy policy.</span>
      </div>
      <button type="button" disabled className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 opacity-50 cursor-not-allowed">Pay Registration Fee</button>
    </motion.div>
  );
} 