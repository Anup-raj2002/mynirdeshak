import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const SignupStepAccountDetails = ({ formData, onChange, errors, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => (
  <>
    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input type="email" name="email" value={formData.email} onChange={onChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Enter your email" required />
      </div>
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>
    {/* Password */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={onChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Enter your password" required />
        <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
    </div>
    {/* Confirm Password */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={onChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Confirm your password" required />
        <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
    </div>
    {/* Terms & Conditions */}
    <div className="flex items-center mt-4">
      <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={onChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
      <span className="ml-2 text-sm text-gray-600">
        I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
      </span>
    </div>
    {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
  </>
);

export default SignupStepAccountDetails; 