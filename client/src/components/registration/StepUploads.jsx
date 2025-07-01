import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

function getFilePreview(file) {
  if (!file) return null;
  if (typeof file === 'string') return file; // base64 or url
  return URL.createObjectURL(file);
}

export default function StepUploads({ formData, onChange, errors = {}, fileErrors = {} }) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <ImageIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Uploads</h2>
        <p className="text-gray-600 mt-2">Upload required documents</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Passport Size Photo *</label><input type="file" name="passportPhoto" accept="image/*" onChange={onChange} className="w-full" required />{formData.passportPhoto && <img src={getFilePreview(formData.passportPhoto)} alt="Passport" className="mt-2 h-16 rounded" />}{errors.passportPhoto && <div className="text-xs text-red-600 mt-1">{errors.passportPhoto}</div>}{fileErrors.passportPhoto && <div className="text-xs text-red-600 mt-1">{fileErrors.passportPhoto}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Signature Photo *</label><input type="file" name="signaturePhoto" accept="image/*" onChange={onChange} className="w-full" required />{formData.signaturePhoto && <img src={getFilePreview(formData.signaturePhoto)} alt="Signature" className="mt-2 h-16 rounded" />}{errors.signaturePhoto && <div className="text-xs text-red-600 mt-1">{errors.signaturePhoto}</div>}{fileErrors.signaturePhoto && <div className="text-xs text-red-600 mt-1">{fileErrors.signaturePhoto}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">ID Proof Photo (Aadhar/PAN/Voter ID) *</label><input type="file" name="idProofPhoto" accept="image/*" onChange={onChange} className="w-full" required />{formData.idProofPhoto && <img src={getFilePreview(formData.idProofPhoto)} alt="ID Proof" className="mt-2 h-16 rounded" />}{errors.idProofPhoto && <div className="text-xs text-red-600 mt-1">{errors.idProofPhoto}</div>}{fileErrors.idProofPhoto && <div className="text-xs text-red-600 mt-1">{fileErrors.idProofPhoto}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">School ID Photo *</label><input type="file" name="schoolIdPhoto" accept="image/*" onChange={onChange} className="w-full" required />{formData.schoolIdPhoto && <img src={getFilePreview(formData.schoolIdPhoto)} alt="School ID" className="mt-2 h-16 rounded" />}{errors.schoolIdPhoto && <div className="text-xs text-red-600 mt-1">{errors.schoolIdPhoto}</div>}{fileErrors.schoolIdPhoto && <div className="text-xs text-red-600 mt-1">{fileErrors.schoolIdPhoto}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">10th Marksheet Photo *</label><input type="file" name="marksheet10Photo" accept="image/*" onChange={onChange} className="w-full" required />{formData.marksheet10Photo && <img src={getFilePreview(formData.marksheet10Photo)} alt="10th Marksheet" className="mt-2 h-16 rounded" />}{errors.marksheet10Photo && <div className="text-xs text-red-600 mt-1">{errors.marksheet10Photo}</div>}{fileErrors.marksheet10Photo && <div className="text-xs text-red-600 mt-1">{fileErrors.marksheet10Photo}</div>}</div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">12th Marksheet Photo *</label><input type="file" name="marksheet12Photo" accept="image/*" onChange={onChange} className="w-full" required />{formData.marksheet12Photo && <img src={getFilePreview(formData.marksheet12Photo)} alt="12th Marksheet" className="mt-2 h-16 rounded" />}{errors.marksheet12Photo && <div className="text-xs text-red-600 mt-1">{errors.marksheet12Photo}</div>}{fileErrors.marksheet12Photo && <div className="text-xs text-red-600 mt-1">{fileErrors.marksheet12Photo}</div>}</div>
      </div>
    </motion.div>
  );
} 