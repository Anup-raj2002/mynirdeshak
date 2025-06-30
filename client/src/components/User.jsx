import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { useCreateUser } from "../queries/useUserQueries";

const USER_ROLES = [
  { value: "admin", label: "Admin" },
  { value: "instructor", label: "Instructor" },
  { value: "student", label: "Student" },
  { value: "test-manager", label: "Test Manager" },
];

const User = () => {
  const { profile: currentUser } = useUser();
  const { showNotification } = useNotification();
  const addUserMutation = useCreateUser();

  const availableRoles = React.useMemo(() => {
    return currentUser?.role === "test-manager"
      ? USER_ROLES.filter(
          (role) => role.value === "student" || role.value === "instructor"
        )
      : USER_ROLES;
  }, [currentUser?.role]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    role: availableRoles[0]?.value || "",
    school: "",
  });

  useEffect(() => {
    if (availableRoles.length > 0 && form.role === "") {
      setForm((prev) => ({
        ...prev,
        role: availableRoles[0].value,
      }));
    } else if (!availableRoles.some(role => role.value === form.role)) {
      setForm(prev => ({
        ...prev,
        role: availableRoles[0]?.value || ''
      }));
    }
  }, [availableRoles, form.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = { ...form };
    if (payload.role === "student") {
      if (!payload.school) {
        showNotification("School Name is required for students.", "error");
        return;
      }
    } else {
      delete payload.school;
    }

    addUserMutation.mutate(payload, {
      onSuccess: () => {
        setForm({
          name: "",
          email: "",
          password: "",
          contactNumber: "",
          role: availableRoles[0].value,
          school: "",
        });
      },
    });
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
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left Side - Blue Cloud Plus Icon (Visible on all devices) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Heading and Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-4 lg:mb-6"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4">Add New User</h2>
            <p className="text-gray-600 text-base lg:text-lg">Add a new user to your platform</p>
          </motion.div>
          {/* Blue Cloud Plus Icon (Inline SVG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#3B82F6"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
            >
              <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
            </svg>
            {/* Animated background circles */}
            <motion.circle
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.5, duration: 2 }}
              cx="40" cy="40" r="15"
              fill="#3B82F6"
              opacity="0.1"
              className="absolute -left-4 -top-4"
            />
            <motion.circle
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: -360 }}
              transition={{ delay: 0.7, duration: 2 }}
              cx="60" cy="60" r="23"
              fill="#3B82F6"
              opacity="0.1"
              className="absolute -right-4 -bottom-4"
            />
          </motion.div>
        </motion.div>

        {/* Right Side - Add User Form (Mobile-friendly) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md mx-auto"
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-200 flex flex-col gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl font-bold text-gray-900 text-center"
            >
              Add New User
            </motion.h2>
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font500 mb-1 sm:mb-2 text-gray-700">
                Name
              </label>
              <input
                id="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name of user"
                required
                disabled={addUserMutation.isPending}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font500 mb-1 sm:mb-2 text-gray-700">
                Email
              </label>
              <input
                id="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email of user"
                required
                disabled={addUserMutation.isPending}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font500 mb-1 sm:mb-2 text-gray-700">
                Password
              </label>
              <input
                id="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                disabled={addUserMutation.isPending}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="contactNumber" className="block text-sm font500 mb-1 sm:mb-2 text-gray-700">
                Contact Number
              </label>
              <input
                id="contactNumber"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                name="contactNumber"
                type="tel"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="1234567890"
                required
                disabled={addUserMutation.isPending}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="role" className="block text-sm font500 mb-1 sm:mb-2 text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                disabled={addUserMutation.isPending}
              >
                {availableRoles.map((role) => (
                  <option value={role.value} key={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </motion.div>
            {form.role === "student" && (
              <motion.div variants={itemVariants}>
                <label htmlFor="school" className="block text-sm font500 mb-1 sm:mb-2 text-gray-700">
                  School Name
                </label>
                <input
                  id="school"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  placeholder="Student school name"
                  required
                  disabled={addUserMutation.isPending}
                />
              </motion.div>
            )}
            <motion.button
              type="submit"
              className="bg-blue-600 text-white w-full px-4 py-2.5 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={addUserMutation.isPending}
              whileHover={hoverEffect}
              whileTap={tapEffect}
            >
              {addUserMutation.isPending ? "Creating User..." : "Create User"}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default User;
