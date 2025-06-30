import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import ProfileSettings from "../components/ProfileSettings";
import MyTests from "../components/MyTests";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import AccountSettings from "../components/AccountSettings";
import CreateTest from "../components/CreateTest";
import { Settings, FileText, User as UserIcon, BookOpen, PlusCircle, Menu } from 'lucide-react';

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleTabChange = (key) => {
    setActiveTab(key);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50 relative">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-20">
        <h1 className="text-xl font-bold">Instructor Portal</h1>
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
            <span className="font700">{item.label}</span>
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
