import React, { useState } from "react";
import { changeEmail, changePassword } from "../../api/auth";
import { useNotification } from "../../context/NotificationContext";
import { useUser } from "../../context/UserContext";
import PasswordInput from "../ui/PasswordInput"; 
import TextInput from '../ui/TextInput'

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

  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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
        <TextInput
          id="newEmail"
          name="newEmail"
          label="Email"
          type="email"
          value={emailForm.newEmail}
          onChange={(e) =>
            setEmailForm((prev) => ({ ...prev, newEmail: e.target.value }))
          }
          placeholder="Enter your new email"
          disabled={loadingEmail}
        />
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
      <PasswordInput
        id="oldPassword"
        label="Old Password"
        name="oldPassword"
        value={passwordForm.oldPassword}
        onChange={(e) =>
          setPasswordForm((prev) => ({ ...prev, oldPassword: e.target.value }))
        }
        isVisible={visibility.oldPassword}
        onToggle={() => toggleVisibility("oldPassword")}
        required
      />

      <PasswordInput
        id="newPassword"
        name="newPassword"
        label="New Password"
        value={passwordForm.newPassword}
        onChange={(e) =>
          setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
        }
        isVisible={visibility.newPassword}
        onToggle={() => toggleVisibility("newPassword")}
        required
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={passwordForm.confirmPassword}
        onChange={(e) =>
          setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
        }
        isVisible={visibility.confirmPassword}
        onToggle={() => toggleVisibility("confirmPassword")}
        required
      />

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
