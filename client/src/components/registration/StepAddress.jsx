import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function StepAddress({ formData, onChange, errors = {} }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <MapPin className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Address</h2>
        <p className="text-gray-600 mt-2">Your address details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label><textarea name="address" value={formData.address} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none" rows={3} required />{errors.address && <div className="text-xs text-red-600 mt-1">{errors.address}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">District *</label><input type="text" name="district" value={formData.district} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.district && <div className="text-xs text-red-600 mt-1">{errors.district}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">City *</label><input type="text" name="city" value={formData.city} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.city && <div className="text-xs text-red-600 mt-1">{errors.city}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">State *</label><input type="text" name="state" value={formData.state} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.state && <div className="text-xs text-red-600 mt-1">{errors.state}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Pin Code *</label><input type="text" name="pinCode" value={formData.pinCode} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.pinCode && <div className="text-xs text-red-600 mt-1">{errors.pinCode}</div>}</div>
      </div>
    </motion.div>
  );
} 