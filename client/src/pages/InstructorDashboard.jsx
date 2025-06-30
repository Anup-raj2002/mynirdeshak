import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import ProfileSettings from "../components/ProfileSettings";
import MyTests from "../components/MyTests";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import AccountSettings from "../components/AccountSettings";
import CreateTest from "../components/CreateTest";
import { Settings, LogOut, FileText, User as UserIcon, BookOpen, PlusCircle } from 'lucide-react';

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { profile: user, loading: userLoading, error: userError } = useUser();

  if (userLoading) return <Loading />;
  if (userError) return <ErrorPage message="Can't find your profile" />;
  if (!user || user.role !== "instructor") return <ErrorPage message="Access Denied" />;

  const sidebarItems = [
    { label: "Profile", icon: UserIcon, key: "profile" },
    { label: "My Tests", icon: BookOpen, key: "myTests" },
    { label: "Create Tests", icon: PlusCircle, key: "createTests" },
    { label: "Settings", icon: Settings, key: "settings" },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl rounded-r-3xl p-6 flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-center mb-6">Instructor Portal</h1>
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
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "myTests" && <MyTests />}
          {activeTab === "createTests" && <CreateTest />}
          {activeTab === "settings" && <AccountSettings />}
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
