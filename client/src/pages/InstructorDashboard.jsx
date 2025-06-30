import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import ProfileSettings from "../components/ProfileSettings";
import MyTests from "../components/MyTests";
import NoUpcomingTests from "../components/NoUpcomingTests"; //TODO change to my tests
//TODO change to the create tests
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import AccountSettings from "../components/AccountSettings";

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { profile: user, loading: userLoading, error: userError } = useUser();
      
  if (userLoading) return <Loading />
  // if (userError) return <ErrorPage message="Can't find your profile" />;
  // if (!user || user.role !== "instructor") return <ErrorPage message="Access Denied" />;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 flex flex-col md:flex-row gap-4 md:gap-6 flex-grow">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-2 md:mb-0">
          <nav className="bg-white rounded-lg shadow p-2 md:p-4 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible">
            {[
              { key: "profile", label: "Profile" },
              { key: "myTests", label: "My Tests" }, 
              { key: "createTests", label: "Create Tests" },
              { key: "settings", label: "Settings" }, 
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 md:w-full text-left px-3 py-2 rounded-lg font-semibold whitespace-nowrap ${
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
          <div className="w-full max-w-lg flex flex-col justify-start">
            {/* Profile Tab */}
            {activeTab === "profile" && <ProfileSettings />}
            {/* My Courses Tab */}
            {activeTab === "myTests" && <MyTests />}
            {/* Create Course Tab */}
            {activeTab === "createTests" && <NoUpcomingTests />} {/*TODO change to the create tests*/}
            {/* Settings Tab */}
            {activeTab === "settings" && <AccountSettings />}
          </div>
        </section>
      </main>
    </div>
  );
};

export default InstructorDashboard;
