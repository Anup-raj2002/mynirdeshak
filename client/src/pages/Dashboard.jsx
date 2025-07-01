import React, { useState } from 'react';
import { BookOpen, Settings, FileText, Menu, User as UserIcon } from 'lucide-react';
import AccountSettings from "../components/AccountSettings";
import ProfileSettings from "../components/ProfileSettings";
import { useUser } from '../contexts/UserContext';
import { useTests } from '../queries/useTestsQueries';
import StudentTestCard from '../components/StudentTestCard';
import Loading from '../components/Loading';
import ErrorPage from '../components/ErrorPage';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('my-tests');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile, loading: userLoading, error: userError } = useUser();

  // Tests hooks
  const {
    data: registeredTests,
    isLoading: registeredLoading,
    error: registeredError,
  } = useTests({ registered: true });
  const {
    data: upcomingTests,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useTests({ upcoming: true });

  // Filter only future tests for upcoming exams
  const now = new Date();
  const filteredUpcomingTests = (upcomingTests || []).filter(
    (test) => new Date(test.endDateTime) > now
  );

  const sidebarItems = [
    { label: 'My Tests', icon: BookOpen, key: 'my-tests' },
    { label: 'Profile Settings', icon: UserIcon, key: 'profile-settings' },
    { label: 'Upcoming Exams', icon: FileText, key: 'upcoming-exams' },
    { label: 'Account Settings', icon: Settings, key: 'account-settings' },
  ];

  if (userLoading) return <Loading />;
  if (userError) return <ErrorPage message={userError.message || 'User not found.'} />;
  if (!profile) return <ErrorPage message="User not found." />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50 relative">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-20">
        <h1 className="text-xl font-bold">Student Portal</h1>
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
          <h1 className="text-xl font700">Menu</h1>
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
            onClick={() => { setActiveSection(item.key); setIsSidebarOpen(false); }}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${activeSection === item.key ? 'bg-blue-100' : 'text-gray-700'}`}
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
        {activeSection === 'my-tests' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">My Registered Tests</h2>
            {registeredLoading && <Loading />}
            {registeredError && <ErrorPage message={registeredError.message} />}
            {!registeredLoading && !registeredError && (
              registeredTests && registeredTests.length > 0 ? (
                <div className="space-y-4">
                  {registeredTests.map((test) => (
                    <StudentTestCard
                      key={test.id}
                      test={test}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">You are not registered for any tests.</div>
              )
            )}
          </div>
        )}

        {activeSection === 'upcoming-exams' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2>
            {upcomingLoading && <Loading />}
            {upcomingError && <ErrorPage message={upcomingError.message} />}
            {!upcomingLoading && !upcomingError && (
              filteredUpcomingTests && filteredUpcomingTests.length > 0 ? (
                <div className="space-y-4">
                  {filteredUpcomingTests.map((test) => (
                    <StudentTestCard
                      key={test.id}
                      test={test}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">No upcoming exams found.</div>
              )
            )}
          </div>
        )}

        {activeSection === 'profile-settings' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <ProfileSettings />
          </div>
        )}

        {activeSection === 'account-settings' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <AccountSettings />
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
