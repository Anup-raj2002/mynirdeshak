import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useUser } from "../../context/UserContext";
import { useNotification } from "../../context/NotificationContext";
import { useAddUser } from "../../hooks/useUserQueries";
import { useBulkAddUsers } from "../../hooks/useUserQueries";

const USER_ROLES = [
  { value: "ADMIN", label: "Admin" },
  { value: "INSTRUCTOR", label: "Instructor" },
  { value: "STUDENT", label: "Student" },
  { value: "COURSE-MANAGER", label: "Course Manager" },
];

const User = () => {
  const { profile: currentUser } = useUser();
  const { showNotification } = useNotification();
  const addUserMutation = useAddUser();
  const bulkAddUsersMutation = useBulkAddUsers();

  const availableRoles = React.useMemo(() => {
    return currentUser?.role === "COURSE-MANAGER"
      ? USER_ROLES.filter(
        (role) => role.value === "STUDENT" || role.value === "INSTRUCTOR"
      )
      : USER_ROLES;
  }, [currentUser?.role]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    role: availableRoles[0]?.value || "",
    schoolName: "",
    studentClass: "",
  });

  const [excelFile, setExcelFile] = useState(null);
  const [parsedExcelData, setParsedExcelData] = useState([]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcelFile(file);
      readExcelFile(file);
    } else {
      setExcelFile(null);
      setParsedExcelData([]);
    }
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setParsedExcelData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = { ...form };
    if (payload.role === "STUDENT") {
      if (!payload.schoolName || !payload.studentClass) {
        showNotification("School Name and Class are required for students.", "error");
        return;
      }
    } else {
      delete payload.schoolName;
      delete payload.studentClass;
    }

    addUserMutation.mutate(payload, {
      onSuccess: () => {
        setForm({
          name: "",
          email: "",
          password: "",
          contactNumber: "",
          role: availableRoles[0].value,
          studentClass: "",
        });
      },
    });
  };

  const handleBulkUpload = () => {
    if (parsedExcelData.length === 0) {
      showNotification("No data parsed from Excel file. Please upload a file.", "error");
      return;
    }

    bulkAddUsersMutation.mutate(parsedExcelData, {
      onSuccess: () => {
        setExcelFile(null);
        setParsedExcelData([]);
      }
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
        {form.role === "STUDENT" && (
          <>
            <div>
              <label htmlFor="schoolName" className="block mb-1 text-sm font-medium text-gray-700">School Name</label>
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
            <div>
              <label htmlFor="studentClass" className="block mb-1 text-sm font-medium text-gray-700">Class</label>
              <input
                id="studentClass"
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
                name="studentClass"
                value={form.studentClass}
                onChange={handleChange}
                placeholder="10"
                required
                disabled={addUserMutation.isPending}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          disabled={addUserMutation.isPending}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addUserMutation.isPending ? "Creating User..." : "Create User"}
        </button>
      </form>
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">OR</span>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Bulk Upload Users from Excel</h3>
        <div>
          <label htmlFor="excelFile" className="block mb-1 text-sm font-medium text-gray-700">Upload Excel File (.xlsx)</label>
          <input
            id="excelFile"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="w-full text-gray-700 py-2.5 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            disabled={bulkAddUsersMutation.isPending}
          />
        </div>
        {excelFile && parsedExcelData.length > 0 && (
          <div className="text-sm text-gray-600">
            {parsedExcelData.length} rows parsed from "{excelFile.name}".
            <p className="mt-2 text-red-500">
              <strong>Important:</strong> Ensure your Excel file has <br />
              columns named exactly: "Name", "Email" (optional), "Password" <br />
              (optional), "Role", "ContactNumber", and for students: "SchoolName", <br />
              "StudentClass".
            </p>
            <p className="text-blue-600">
              <em>If 'Email' is missing, an access ID will be generated (e.g., 'abXXXX@learnocept.in').</em>
            </p>
            <p className="text-blue-600">
              <em>If 'Password' is missing, a temporary password will be generated.</em>
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={handleBulkUpload}
          disabled={!excelFile || bulkAddUsersMutation.isPending || parsedExcelData.length === 0}
          className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {bulkAddUsersMutation.isPending ? "Uploading Users..." : "Upload Users from Excel"}
        </button>
      </div>
    </div>
  );
};

export default User;