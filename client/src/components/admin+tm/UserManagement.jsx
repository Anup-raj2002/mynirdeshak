
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNotification } from "../../context/NotificationContext";
import { useUsers, useDeleteUser, useUpdateUser } from "../../hooks/useUserQueries"; 

function UserManagement() {
  const { profile: currentUser } = useUser();
  const { showNotification } = useNotification();
  const [searchEmail, setSearchEmail] = useState("");
  const [currentFilters, setCurrentFilters] = useState({}); 

  const [editModal, setEditModal] = useState({ open: false, user: null });
  const [editForm, setEditForm] = useState({ schoolName: "", studentClass: "" });

  
  const {
    data: users,
    isLoading: loadingUsers,
    isError: usersError,
    error: usersErrorMessage,
    refetch: refetchUsers, 
  } = useUsers(currentFilters); 

  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();

  
  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    if (currentUser?.role === "COURSEMGR") {
      return users.filter(
        (u) => u.role === "INSTRUCTOR" || u.role === "STUDENT"
      );
    }
    return users;
  }, [users, currentUser?.role]);


  
  const fetchAllUsers = () => {
    setCurrentFilters({}); 
    
    
    refetchUsers();
    showNotification("Loading all users...", "info"); 
  };

  
  const searchByEmail = () => {
    const email = searchEmail.trim().toLowerCase();
    if (!email) {
      showNotification("Please enter an email to search.", "info");
      return;
    }
    setCurrentFilters({ email }); 
    showNotification("Searching for user...", "info"); 
  };

  const handleDeleteUser = (uid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    deleteUserMutation.mutate(uid, {
      onSuccess: () => {
        showNotification("User deleted successfully!", "success");
      },
      onError: (err) => {
        showNotification(`Failed to delete user: ${err.message}`, "error");
      },
    });
  };

  const handleEditUser = (user) => {
    setEditForm({
      schoolName: user.schoolName || "",
      studentClass: user.studentClass || "",
    });
    setEditModal({ open: true, user });
  };

  const handleEditFormChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const payload = {
      profileUID: editModal.user.uid,
      schoolName: editForm.schoolName,
      studentClass: editForm.studentClass,
    };

    updateUserMutation.mutate(payload, {
      onSuccess: () => {
        showNotification("User updated successfully!", "success");
        setEditModal({ open: false, user: null });
      },
      onError: (err) => {
        showNotification(`Failed to update user: ${err.message}`, "error");
      },
    });
  };

  const closeEditModal = () => {
    setEditModal({ open: false, user: null });
    showNotification("Edit cancelled.", "info");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl p-4 w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 w-full max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-blue-700 tracking-tight">
          User Management
        </h2>
        <div className="flex w-full sm:w-auto gap-2">
          {/* Search input container */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border border-blue-300 rounded-full py-2 pl-4 pr-10 text-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchByEmail();
                }
              }}
            />
            <button
              type="button"
              onClick={searchByEmail}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-900 focus:outline-none"
              aria-label="Search by email"
            >
              {/* Magnifying glass icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
          {/* Load Users button */}
          <button
            onClick={fetchAllUsers}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow transition w-full sm:w-auto"
            disabled={loadingUsers || deleteUserMutation.isPending || updateUserMutation.isPending}
          >
            {loadingUsers ? "Loading..." : "Load Users"}
          </button>
        </div>
      </div>

      {usersError && (
        <div className="text-red-600 text-center py-4">
          Error fetching users: {usersErrorMessage.message}
        </div>
      )}

      {loadingUsers && (
        <div className="text-gray-500 text-center py-8">Loading users...</div>
      )}

      {!loadingUsers && filteredUsers.length === 0 && (
        <div className="text-gray-400 text-center py-8">No users found.</div>
      )}

      <div className="flex flex-col gap-6">
        {filteredUsers.map((u) => (
          <div
            key={u.uid}
            className="relative bg-white border border-blue-100 rounded-2xl shadow-md p-5 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-xl font-extrabold text-blue-900 break-all">{u.name}</span>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide shadow-sm w-fit">
                  {u.role}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mb-2 text-xs text-gray-500 font-mono">
                <div>
                  <span className="font-semibold">UID:</span> {u.uid}
                </div>
                <div>
                  <span className="font-semibold">User ID:</span> {u.id || u.userId || "N/A"}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-[15px]">
                <div className="break-all">
                  <span className="font-semibold">Email:</span>
                  <span className="ml-1">{u.email}</span>
                </div>
                <div>
                  <span className="font-semibold">Contact:</span>
                  <span className="ml-1">{u.contactNumber}</span>
                </div>
                {u.role === "STUDENT" && (
                  <>
                    <div>
                      <span className="font-semibold">School Name:</span>
                      <span className="ml-1">{u.schoolName}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Class:</span>
                      <span className="ml-1">{u.studentClass}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 flex items-end sm:items-center mt-4 sm:mt-0 gap-2">
              {u.role === "STUDENT" && (
                <button
                  onClick={() => handleEditUser(u)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-200 bg-yellow-50 text-yellow-700 font-semibold shadow-sm hover:bg-yellow-100 hover:text-yellow-900 hover:border-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  title="Edit User"
                  disabled={updateUserMutation.isPending || deleteUserMutation.isPending}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0l-9.5 9.5A2 2 0 004 13.414V16a1 1 0 001 1h2.586a2 2 0 001.414-.586l9.5-9.5a2 2 0 000-2.828l-2-2zM5 15v-1.586l9-9L16.586 6l-9 9H5zm11.293-9.707l-2-2a1 1 0 00-1.414 0l-1.293 1.293 3.414 3.414 1.293-1.293a1 1 0 000-1.414z" />
                  </svg>
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteUser(u.uid)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 font-semibold shadow-sm hover:bg-blue-100 hover:text-blue-900 hover:border-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-200"
                title="Delete User"
                disabled={deleteUserMutation.isPending || updateUserMutation.isPending}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Student</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-semibold mb-1">School Name</label>
                <input
                  type="text"
                  name="schoolName"
                  value={editForm.schoolName}
                  onChange={handleEditFormChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                  disabled={updateUserMutation.isPending}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Class</label>
                <input
                  type="text"
                  name="studentClass"
                  value={editForm.studentClass}
                  onChange={handleEditFormChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                  disabled={updateUserMutation.isPending}
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  disabled={updateUserMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  disabled={updateUserMutation.isPending}
                >
                  {updateUserMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;