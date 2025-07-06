import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function StepCareerAcademic({ formData, onChange, errors = {} }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Career & Academic</h2>
        <p className="text-gray-600 mt-2">Your academic and career details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Preferred Career Goal *</label><select name="careerGoal" value={formData.careerGoal} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required><option value="">Select</option><option value="engg">Engineering</option><option value="doctor">Doctor</option><option value="govt">Government Job</option><option value="entrepreneur">Entrepreneur</option><option value="research">Research</option><option value="other">Other</option></select>{errors.careerGoal && <div className="text-xs text-red-600 mt-1">{errors.careerGoal}</div>}</div>
        {formData.careerGoal === 'other' && (
          <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Other Career Goal *</label><input type="text" name="careerGoalOther" value={formData.careerGoalOther} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.careerGoalOther && <div className="text-xs text-red-600 mt-1">{errors.careerGoalOther}</div>}</div>
        )}
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Class Passed *</label><select name="classPassed" value={formData.classPassed} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required><option value="">Select</option><option value="10">10th</option><option value="12">12th</option></select>{errors.classPassed && <div className="text-xs text-red-600 mt-1">{errors.classPassed}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Year of Passing *</label><input type="number" name="yearOfPassing" value={formData.yearOfPassing} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.yearOfPassing && <div className="text-xs text-red-600 mt-1">{errors.yearOfPassing}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Board Name *</label><input type="text" name="board" value={formData.board} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.board && <div className="text-xs text-red-600 mt-1">{errors.board}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label><input type="text" name="school" value={formData.school} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" required />{errors.school && <div className="text-xs text-red-600 mt-1">{errors.school}</div>}</div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stream *</label>
          <select
            name="stream"
            value={formData.stream}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            required
          >
            <option value="">Select</option>
            <option value="PCM">PCM</option>
            <option value="PCB">PCB</option>
            <option value="PCMB">PCMB</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
            <option value="Others">Others</option>
          </select>
          {errors.stream && <div className="text-xs text-red-600 mt-1">{errors.stream}</div>}
        </div>
      </div>
    </motion.div>
  );
} 