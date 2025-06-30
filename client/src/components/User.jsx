import React, { useState, useEffect } from "react";
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
      delete payload.schoolName;
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

  return (
    <div className="p-6 sm:p-8 w-full max-w-lg mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">Add New User</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name of user"
            required
            disabled={addUserMutation.isPending}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email of user"
            required
            disabled={addUserMutation.isPending}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            required
            disabled={addUserMutation.isPending}
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="block mb-1 text-sm font-medium text-gray-700">Contact Number</label>
          <input
            id="contactNumber"
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
            name="contactNumber"
            type="tel"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="1234567890"
            required
            disabled={addUserMutation.isPending}
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-1 text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
            required
            disabled={addUserMutation.isPending}
          >
            {availableRoles.map((role) => (
              <option value={role.value} key={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        {form.role === "student" && (
            <div>
              <label htmlFor="school" className="block mb-1 text-sm font-medium text-gray-700">School Name</label>
              <input
                id="schoolName"
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
                name="schoolName"
                value={form.schoolName}
                onChange={handleChange}
                placeholder="Student school name"
                required
                disabled={addUserMutation.isPending}
              />
            </div>
        )}
        <button
          type="submit"
          disabled={addUserMutation.isPending}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addUserMutation.isPending ? "Creating User..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default User;