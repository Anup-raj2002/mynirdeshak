import React, { useState } from "react";
import User from "../components/User.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import UserManagement from "../components/UserManagement.jsx";
import GrantOfflineTest from "../components/GrantOfflineTest.jsx";
import NoUpcomingTests from "../components/NoUpcomingTests.jsx"; //TODO change to view tests
import ProfileSetting from "../components/ProfileSetting.jsx";
import AccountSettingsForm from "../components/AccountSetting.jsx";
import Loading from "../components/Loading.jsx"
import ErrorPage from "../components/ErrorPage.jsx"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("viewTests");
  const { profile: user, loading: userLoading, error: userError } = useUser();

  if (userLoading) return <Loading />;
  if (userError) return <ErrorPage message="Can't find your profile" />;
  if (!user || user.role !== "admin") return <ErrorPage message="Access Denied" />;

  const tabs = [
    { key: "viewTests", label: "View All Tests" },
    { key: "profile", label: "Profile" },
    { key: "grantTests", label: "Grant Offline Tests" },
    { key: "addUser", label: "Add User" },
    { key: "userManagement", label: "User Management" },
    { key: "Settings", label: "Settings" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 flex flex-col md:flex-row gap-4 md:gap-6 flex-grow">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-2 md:mb-0">
          <nav className="bg-white rounded-lg shadow p-2 md:p-4 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 md:w-full min-h-[48px] text-left px-3 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <section className="flex-1 flex justify-center items-start">
          <div className="w-full flex flex-col justify-start">
            {activeTab === "viewTests" && <NoUpcomingTests />}
            {activeTab === "profile" && <ProfileSetting />}
            {activeTab === "grantTests" && <GrantOfflineTest />}
            {activeTab === "addUser" && (
              <div className="bg-white rounded-lg shadow p-3 w-full flex flex-col">
                <User />
              </div>
            )}
            {activeTab === "userManagement" && <UserManagement />}
            {activeTab === "Settings" && <AccountSettingsForm />}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
