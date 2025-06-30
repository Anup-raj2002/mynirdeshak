import React, { useState } from 'react';
import { BookOpen, Calendar, TrendingUp, Settings, FileText, Menu } from 'lucide-react';
import AccountSettings from "../components/AccountSettings"; 
const ExamInfoContent = ({ onClose }) => {
  const upcomingExams = [
    'Physics - June 5, 2025',
    'Mathematics - June 10, 2025',
    'Chemistry - June 15, 2025',
  ];
  return (
    <div className="bg-white rounded-xl p-6 shadow w-full">
      <h2 className="text-xl font-bold mb-4">Exam Info</h2>
      <div>
        <h3 className="text-lg font-medium mb-2">Upcoming Exams</h3>
        {upcomingExams.length > 0 ? (
          <ul className="space-y-2">
            {upcomingExams.map((exam, idx) => (
              <li key={idx} className="py-2 border-b border-gray-100">{exam}</li>
            ))}
          </ul>
        ) : (
          <p>No upcoming exams.</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock profile data
  const profile = { name: 'Student Name', email: 'student@example.com', role: 'student' };

  // Stats
  const stats = [
    { icon: BookOpen, label: 'Exam Status', value: 'Scheduled', color: 'from-blue-400 to-indigo-500' },
    { icon: Calendar, label: 'Exam Date', value: 'Feb 20, 2024', color: 'from-green-400 to-emerald-500' },
    { icon: TrendingUp, label: 'Scholarship', value: 'Pending', color: 'from-purple-400 to-pink-500' },
  ];

  // Sidebar navigation items (logout removed)
  const sidebarItems = [
    { label: 'Exam Info', icon: BookOpen, onClick: () => { setActiveSection('exam-info'); setIsSidebarOpen(false); } },
    { label: 'View Result', icon: FileText, onClick: () => { setActiveSection('result'); setIsSidebarOpen(false); } },
    { label: 'Settings', icon: Settings, onClick: () => { setActiveSection('settings'); setIsSidebarOpen(false); } },
  ];

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
            key={item.label}
            onClick={item.onClick}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition text-gray-700`}
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
        {activeSection === 'dashboard' && (
          <>
            {/* Welcome Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome, {profile.name}!</h2>
              <p className="text-gray-600">Here’s what’s happening today.</p>
            </section>

            {/* Stats Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">{stat.label}</h3>
                    <p className="text-2xl font700 mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === 'exam-info' && (
          <ExamInfoContent onClose={() => setActiveSection('dashboard')} />
        )}

        {activeSection === 'settings' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font700 mb-4">Account Settings</h2>
            <AccountSettings />
            <button
              onClick={() => setActiveSection('dashboard')}
              className="mt-4 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {activeSection === 'result' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">View Result</h2>
            <p>Your results will be displayed here.</p>
            <button
              onClick={() => setActiveSection('dashboard')}
              className="mt-4 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
