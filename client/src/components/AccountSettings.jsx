import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { changeEmail, changePassword } from '../api/auth';
import { useNotification } from '../contexts/NotificationContext';
import { useUser } from '../contexts/UserContext';

function AccountSettings() {
  const { profile } = useUser();
  const { showNotification } = useNotification();

  const [emailForm, setEmailForm] = useState({
    newEmail: profile?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    const newEmail = emailForm.newEmail.trim().toLowerCase();
    const currentEmail = profile?.email?.trim().toLowerCase();

    if (!newEmail) {
      showNotification('Please enter a new email address.', 'info');
      return;
    }

    if (newEmail === currentEmail) {
      showNotification('New email is the same as current email.', 'info');
      return;
    }

    setLoadingEmail(true);
    try {
      await changeEmail(newEmail);
      showNotification('Email updated. Please verify your new email.', 'success');
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setLoadingEmail(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      showNotification('Please fill in all password fields.', 'info');
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification('Passwords do not match.', 'error');
      return;
    }

    if (oldPassword === newPassword) {
      showNotification('New password must be different from the old password.', 'info');
      return;
    }

    setLoadingPassword(true);
    try {
      await changePassword(oldPassword, newPassword);
      showNotification('Password updated successfully!', 'success');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setLoadingPassword(false);
    }
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  const hoverEffect = { scale: 1.03, transition: { duration: 0.2 } };
  const tapEffect = { scale: 0.98 };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration (as in your signup page) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Heading and Subheading at the top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Manage Your Account</h2>
              <p className="text-gray-600 text-lg">
                Update your email and password to keep your account secure
              </p>
            </motion.div>
            {/* Vector Illustration (from your signup page) */}
            <svg viewBox="0 0 500 400" className="w-full h-auto">
              <defs>
                <linearGradient id="signupGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="signupGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              
              {/* Background Elements */}
              <motion.circle
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.5, duration: 2 }}
                cx="80" cy="80" r="40" fill="url(#signupGrad1)" opacity="0.2"
              />
              <motion.circle
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: -360 }}
                transition={{ delay: 0.7, duration: 2 }}
                cx="420" cy="320" r="60" fill="url(#signupGrad2)" opacity="0.2"
              />
              
              {/* Main Illustration - Student with Books */}
              <motion.rect
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                x="180" y="120" width="140" height="180" rx="70" fill="url(#signupGrad1)" opacity="0.8"
              />
              
              {/* Books */}
              <motion.rect
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                x="120" y="250" width="80" height="12" rx="6" fill="url(#signupGrad2)"
              />
              <motion.rect
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                x="300" y="250" width="80" height="12" rx="6" fill="url(#signupGrad1)"
              />
              
              {/* Graduation Cap */}
              <motion.polygon
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                points="220,100 280,100 250,80"
                fill="url(#signupGrad2)"
              />
              
              {/* Success Elements */}
              <motion.circle
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                cx="350" cy="150" r="20" fill="#10B981"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                d="M340,150 L348,158 L360,142"
                stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Right Side - Account Settings Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <motion.form className="space-y-8">
            {/* Email Update Section */}
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-600 text-right mb-2">
                <strong>User ID:</strong> {profile?.uid}
              </p>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                <motion.input
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  value={emailForm.newEmail}
                  onChange={(e) => setEmailForm((prev) => ({ ...prev, newEmail: e.target.value }))}
                  placeholder="Enter your new email"
                  disabled={loadingEmail}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                  required
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
                />
              </div>
              <motion.button
                type="button"
                className="mt-4 px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                disabled={loadingEmail}
                onClick={handleEmailChange}
                whileHover={hoverEffect}
                whileTap={tapEffect}
              >
                {loadingEmail ? "Updating..." : "Update Email"}
              </motion.button>
            </motion.div>

            {/* Password Update Section */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8" variants={itemVariants}>
              {/* Old Password */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2">Old Password</label>
                <div className="relative">
                  <motion.input
                    id="oldPassword"
                    name="oldPassword"
                    type={showPassword.oldPassword ? "text" : "password"}
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, oldPassword: e.target.value }))}
                    placeholder="Enter old password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                    required
                    whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("oldPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                  >
                    {showPassword.oldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <motion.input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword.newPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                    required
                    whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("newPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                  >
                    {showPassword.newPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {/* Confirm Password */}
              <div className="sm:col-span-2 relative">
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <motion.input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white text-gray-700"
                    required
                    whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("confirmPassword")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                  >
                    {showPassword.confirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div className="flex justify-end" variants={itemVariants}>
              <motion.button
                type="submit"
                className="px-8 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                disabled={loadingPassword}
                onClick={handlePasswordChange}
                whileHover={hoverEffect}
                whileTap={tapEffect}
              >
                {loadingPassword ? "Updating..." : "Change Password"}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default AccountSettings;
