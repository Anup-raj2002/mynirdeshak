import React, { useState } from "react";
import User from "../components/User.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import UserManagement from "../components/UserManagement.jsx";
import MyTests from "../components/MyTests.jsx";
import ProfileSettings from "../components/ProfileSettings.jsx";
import AccountSettings from "../components/AccountSettings.jsx";
import Loading from "../components/Loading.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import { Settings, FileText, User as UserIcon, UserPlusIcon, BookOpen, Menu, UsersIcon } from 'lucide-react';
import GrantStudent from "./GrantStudent.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("viewTests");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile: user, loading: userLoading, error: userError } = useUser();

  if (userLoading) return <Loading />;
  if (userError) return <ErrorPage message="Can't find your profile" />;
  if (!user || user.role !== "admin") return <ErrorPage message="Access Denied" />;

  const sidebarItems = [
    { label: "View All Tests", icon: BookOpen, key: "viewTests" },
    { label: "Add User", icon: UserPlusIcon, key: "addUser" },
    { label: "User Management", icon: UsersIcon, key: "userManagement" },
    { label: "Profile", icon: UserIcon, key: "profile" },
    { label: "Settings", icon: Settings, key: "Settings" },
    { label: "Grant Student", icon: FileText, key: "grantStudent" },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50 relative">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-20">
        <h1 className="text-xl font-bold">Admin Portal</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-blue-50"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Sidebar (Drawer on mobile) */}
      <aside
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                   fixed md:relative z-10 w-64 h-screen bg-white shadow-xl md:rounded-r-3xl p-6 flex flex-col space-y-4 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold">Menu</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-blue-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleTabChange(item.key)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${activeTab === item.key ? 'bg-blue-100' : 'text-gray-700'}`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Overlay for sidebar (mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
        <div className="bg-white rounded-xl p-6 shadow">
          {activeTab === "viewTests" && <MyTests />}
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "addUser" && (
            <div className="bg-white rounded-lg shadow p-3 w-full flex flex-col">
              <User />
            </div>
          )}
          {activeTab === "userManagement" && <UserManagement />}
          {activeTab === "Settings" && <AccountSettings />}
          {activeTab === "grantStudent" && <GrantStudent />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
