import React, { useState } from "react";
import User from "../../components/user/User";
import { useUser } from "../../contexts/UserContext.jsx";
import UserManagement from "../../components/user/UserManagement";
import MyTests from "../../components/test/MyTests";
import ProfileSettings from "../../components/user/ProfileSettings";
import AccountSettings from "../../components/user/AccountSettings";
import Loading from "../../components/ui/Loading";
import ErrorPage from "../../components/ui/ErrorPage";
import { Settings, FileText, User as UserIcon, BookOpen, UsersIcon,UserPlusIcon } from 'lucide-react';
import GrantTest from "../../components/test/GrantTest";
import SessionManager from '../../components/test/SessionManager';

function CourseManagerDashboard() {
  const { profile: user, loading: userLoading, error: userError } = useUser();
  const [activeTab, setActiveTab] = useState("viewTests");

  if (userLoading) return <Loading />;
  if (userError) return <ErrorPage message={userError.message} />;
  if (!user || user.role !== "test-manager") return <ErrorPage message="Access Denied" />;

  const sidebarItems = [
    { label: "View All Tests", icon: BookOpen, key: "viewTests" },
    { label: "Add User", icon: UserPlusIcon, key: "addUser" },
    { label: "User Management", icon: UsersIcon, key: "userManagement" },
    { label: "Profile", icon: UserIcon, key: "profile" },
    { label: "Settings", icon: Settings, key: "Settings" },
    { label: "Grant Student", icon: FileText, key: "grantStudent" },
    { label: "Session Management", icon: FileText, key: "sessionManager" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl rounded-r-3xl p-6 flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-center mb-6">Test Manager Portal</h1>
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
          {activeTab === "addUser" && (
            <div className="bg-white rounded-lg shadow p-3 w-full flex flex-col">
              <User />
            </div>
          )}
          {activeTab === "userManagement" && <UserManagement />}
          {activeTab === "Settings" && <AccountSettings />}
          {activeTab === "grantStudent" && <GrantTest />}
          {activeTab === "sessionManager" && <SessionManager />}
        </div>
      </main>
    </div>
  );
};

export default CourseManagerDashboard;
