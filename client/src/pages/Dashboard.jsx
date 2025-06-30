import React, { useState } from 'react';
import { BookOpen, Calendar, TrendingUp, Settings, LogOut, FileText } from 'lucide-react';
import AccountSettings from "../components/AccountSettings";

// Example exam info content
const ExamInfoContent = ({ onClose }) => {
  const upcomingExams = [
    'Physics - June 5, 2025',
    'Mathematics - June 10, 2025',
    'Chemistry - June 15, 2025',
  ];
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font700 mb-4">Exam Info</h2>
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
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard', 'exam-info', 'settings', 'result'
  // Mock profile data
  const profile = { name: 'Student Name', email: 'student@example.com', role: 'student' };
  // Stats (removed 'Current Rank')
  const stats = [
    { icon: BookOpen, label: 'Exam Status', value: 'Scheduled', color: 'from-blue-400 to-indigo-500' },
    { icon: Calendar, label: 'Exam Date', value: 'Feb 20, 2024', color: 'from-green-400 to-emerald-500' },
    { icon: TrendingUp, label: 'Scholarship', value: 'Pending', color: 'from-purple-400 to-pink-500' },
  ];

  // Sidebar navigation items (no Dashboard section, but Dashboard is default)
  const sidebarItems = [
    { label: 'Exam Info', icon: BookOpen, onClick: () => setActiveSection('exam-info') },
    { label: 'View Result', icon: FileText, onClick: () => setActiveSection('result') },
    { label: 'Settings', icon: Settings, onClick: () => setActiveSection('settings') },
    { label: 'Logout', icon: LogOut, onClick: () => {/* Handle logout */}, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl rounded-r-3xl p-6 flex flex-col space-y-4">
        <h1 className="text-xl font-bold text-center mb-6">Student Portal</h1>
        {sidebarItems.map((item, idx) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition ${item.color || 'text-gray-700'}`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
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
                {stats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg`}
                  >
                    <stat.icon className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">{stat.label}</h3>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
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
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <AccountSettings />
            <button
              onClick={() => setActiveSection('dashboard')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
