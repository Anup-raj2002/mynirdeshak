import React from 'react';

const SignupStepPersonalDetails = ({ formData, onChange, errors }) => (
  <>
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
      <input type="text" name="name" value={formData.name} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Enter your full name" required />
      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
    </div>
    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
      <input type="tel" name="phone" value={formData.phone} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Enter your phone number" required maxLength={10} />
      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
    </div>
    {/* DOB */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
      <input type="date" name="dob" value={formData.dob} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" required />
      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
    </div>
    {/* Father's Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
      <input type="text" name="fatherName" value={formData.fatherName} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Enter your father's name" required />
      {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
    </div>
    {/* Mother's Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
      <input type="text" name="motherName" value={formData.motherName} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Enter your mother's name" required />
      {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName}</p>}
    </div>
    {/* Alternative Mobile Number */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Mobile Number</label>
      <input type="tel" name="altPhone" value={formData.altPhone} onChange={onChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" placeholder="Enter alternative mobile number" maxLength={10} />
      {errors.altPhone && <p className="text-red-500 text-xs mt-1">{errors.altPhone}</p>}
    </div>
  </>
);

export default SignupStepPersonalDetails; 