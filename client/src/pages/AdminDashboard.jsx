import React, { useState } from "react";
import User from "../components/User.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import UserManagement from "../components/UserManagement.jsx";
import GrantOfflineTest from "../components/GrantOfflineTest.jsx";
import MyTests from "../components/MyTests.jsx";
import ProfileSettings from "../components/ProfileSettings.jsx";
import AccountSettings from "../components/AccountSettings.jsx";
import Loading from "../components/Loading.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import { Settings, LogOut, FileText, User as UserIcon, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("viewTests");
  const { profile: user, loading: userLoading, error: userError } = useUser();

  if (userLoading) return <Loading />;
  if (userError) return <ErrorPage message="Can't find your profile" />;
  if (!user || user.role !== "admin") return <ErrorPage message="Access Denied" />;

  const sidebarItems = [
    { label: "View All Tests", icon: BookOpen, key: "viewTests" },
    { label: "Profile", icon: UserIcon, key: "profile" },
    { label: "Grant Offline Tests", icon: FileText, key: "grantTests" },
    { label: "Add User", icon: UserIcon, key: "addUser" },
    { label: "User Management", icon: Settings, key: "userManagement" },
    { label: "Settings", icon: Settings, key: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl rounded-r-3xl p-6 flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-center mb-6">Admin Portal</h1>
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${item.color || 'text-gray-700'} ${activeTab === item.key ? 'bg-blue-100' : ''}`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl p-6 shadow">
          {activeTab === "viewTests" && <MyTests />}
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "grantTests" && <GrantOfflineTest />}
          {activeTab === "addUser" && (
            <div className="bg-white rounded-lg shadow p-3 w-full flex flex-col">
              <User />
            </div>
          )}
          {activeTab === "userManagement" && <UserManagement />}
          {activeTab === "Settings" && <AccountSettings />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
