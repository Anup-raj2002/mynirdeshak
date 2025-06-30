import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProfileForm from "../components/profile/ProfileSetting";
import AccountForm from "../components/profile/AccountSetting";
import LoadingPage from "../components/ui/LoadingPage";
import ErrorPage from '../components/ui/ErrorPage';
import ImageWithFallback from "../components/ui/ImageWithFallback";
import { useStudentCertificates } from "../hooks/useStudentQueries";
import ProgressDashboard from "../components/dashboard/ProgressDashboard";
import MyCoursesList from "../components/dashboard/MyCoursesList";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Progress");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { profile: user, loading: userLoading, error: userError } = useUser();
  const { data: certificates = [], isLoading: certificatesLoading } = useStudentCertificates(user);
  const isLoading = userLoading || certificatesLoading;

  
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [sidebarOpen]);

  if (isLoading) return <LoadingPage />;
  if (userError) return <ErrorPage message="Can't find your profile" />;
  if (!user || user.role !== "student") return <ErrorPage message="Access Denied" />;

  const SuccessPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
      <div className="bg-white rounded-2xl shadow-lg px-6 sm:px-10 py-8 flex flex-col items-center relative min-w-[80vw] sm:min-w-[300px] max-w-[90vw]">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-black focus:outline-none"
          onClick={() => setShowSuccessPopup(false)}
        >
          &times;
        </button>
        <span className="text-gray-500 text-lg sm:text-xl text-center">
          Changes have been successfully saved
        </span>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileForm />;
      case "Progress":
        return <ProgressDashboard userId={user.id} />;
      case "My Courses":
        return <MyCoursesList />;
      case "Certificates":
        return (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-2">Certificates</h2>
            <p className="mb-6 text-gray-600">
              View and download your earned certificates
            </p>
            {certificates.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
                  alt="No Certificates"
                  className="mx-auto mb-4 w-24 h-24 opacity-60"
                />
                <div className="text-lg font-semibold mb-2">
                  No certificates yet
                </div>
                <div className="text-sm">
                  Complete a course to earn your first certificate!
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
                  >
                    {/* Removed ImageWithFallback since you don't have photos */}
                    <h3 className="font-semibold text-lg mb-1 text-center">
                      {cert.course.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1 text-center">
                      By Learnocept
                    </p>
                    <div className="w-full flex justify-between items-center mb-2 text-xs">
                      <span className="text-gray-500">
                        {new Date(cert.issuedAt).toLocaleDateString()}
                      </span>
                      <span className="text-green-600 font-semibold">Completed</span>
                    </div>
                    <a href={`/api/${import.meta.env.VITE_API_VERSION}/certificates/${cert.certificateId}`} passHref>
                      <button
                        className="bg-purple-600 w-full text-white px-4 py-2 rounded mt-2 hover:bg-purple-700 transition-colors"
                      >
                        View / Download
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "Settings":
        return <AccountForm />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <button
          className="md:hidden m-4 p-2 bg-purple-600 text-white rounded shadow self-start z-20"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
        <aside
          className={`fixed md:static top-0 left-0 h-full md:h-auto z-20 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:w-64 w-3/4 bg-white shadow rounded-xl md:m-4 flex flex-col items-center py-6`}
        >
          <ImageWithFallback
            photoUrl={user.photoUrl}
            isProfileImage
            alt={"Profile"}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow mb-2 mt-4 md:mt-0"
          />
          <h2 className="font-semibold text-base sm:text-lg mt-2 text-center px-2">
            {user.name}
          </h2>
          <nav className="w-full mt-4">
            <ul>
              {[
                "Progress",
                "Profile",
                "My Courses",
                "Certificates",
                "Settings",
              ].map((tab) => (
                <li
                  key={tab}
                  className={`px-4 sm:px-8 py-2 cursor-pointer rounded-l-full font-semibold mb-1 transition-colors duration-200 ${activeTab === tab
                      ? "bg-purple-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                    }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-2 sm:p-4 md:p-8 mt-4 md:mt-0">
          {renderContent()}
        </main>
      </div>
      {showSuccessPopup && <SuccessPopup />}
    </>
  );
};

export default StudentDashboard;
