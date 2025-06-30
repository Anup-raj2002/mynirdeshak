import React, { useState } from "react";
import { changeEmail, changePassword } from "../api/auth";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AccountSettingsForm() {
  const { profile } = useUser();
  const { showNotification } = useNotification();

  const [emailForm, setEmailForm] = useState({
    newEmail: profile?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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
      showNotification("Please enter a new email address.", "info");
      return;
    }

    if (newEmail === currentEmail) {
      showNotification("New email is the same as current email.", "info");
      return;
    }

    setLoadingEmail(true);
    try {
      await changeEmail(newEmail);
      showNotification("Email updated. Please verify your new email.", "success");
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      showNotification("Please fill in all password fields.", "info");
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification("New passwords do not match.", "error");
      return;
    }

    if (oldPassword === newPassword) {
      showNotification("New password must be different from the old password.", "info");
      return;
    }

    setLoadingPassword(true);
    try {
      await changePassword(oldPassword, newPassword);
      showNotification("Password updated successfully!", "success");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <form className="space-y-8 bg-white rounded-xl shadow p-6 mb-6">
      {/* Email Update Section */}
      <div>
        <p className="text-sm text-gray-600 text-right mb-2">
          <strong>User ID:</strong> {profile?.uid}
        </p>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="newEmail"
            name="newEmail"
            type="email"
            value={emailForm.newEmail}
            onChange={(e) => setEmailForm((prev) => ({ ...prev, newEmail: e.target.value }))}
            placeholder="Enter your new email"
            disabled={loadingEmail}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            required
          />
        </div>
        <button
          type="button"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          disabled={loadingEmail}
          onClick={handleEmailChange}
        >
          {loadingEmail ? "Updating..." : "Update Email"}
        </button>
      </div>

      {/* Password Update Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="oldPassword"
              name="oldPassword"
              type={showPassword.oldPassword ? 'text' : 'password'}
              value={passwordForm.oldPassword}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, oldPassword: e.target.value }))}
              placeholder="Enter old password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => ({ ...prev, oldPassword: !prev.oldPassword }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword.oldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="newPassword"
              name="newPassword"
              type={showPassword.newPassword ? 'text' : 'password'}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
              placeholder="Enter new password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => ({ ...prev, newPassword: !prev.newPassword }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword.newPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* Confirm Password */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword.confirmPassword ? 'text' : 'password'}
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Confirm new password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword.confirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-2 rounded"
          disabled={loadingPassword}
          onClick={handlePasswordChange}
        >
          {loadingPassword ? "Updating..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}
