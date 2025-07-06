import React, { useState, useEffect } from 'react';
import { BookOpen, Settings, FileText, Menu, User as UserIcon, Clock } from 'lucide-react';
import AccountSettings from "../../components/user/AccountSettings";
import ProfileSettings from "../../components/user/ProfileSettings";
import { useUser } from '../../contexts/UserContext';
import { useTests } from '../../queries/useTestsQueries';
import StudentTestCard from '../../components/test/StudentTestCard';
import Loading from '../../components/ui/Loading';
import ErrorPage from '../../components/ui/ErrorPage';
import { useCheckPaymentStatus } from '../../queries/useTestsQueries';
import { useNavigate } from 'react-router-dom';
import { getSectionMeta } from '../../utils/sectionConfig';

const STREAM_LABELS = {
  PCM: "PCM (Physics, Chemistry, Maths)",
  PCB: "PCB (Physics, Chemistry, Biology)",
  PCMB: "PCMB (All Four Science Subjects)",
  Commerce: "Commerce (Accounts, Business, Economics)",
  Arts: "Arts / Humanities",
  Others: "Others (Vocational / ITI / Polytechnic / Open School)",
};

const ExamDetailsModal = ({ open, onClose, test }) => {
  if (!open || !test) return null;
  const sectionMeta = getSectionMeta(test.stream);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 z-10">
          <Clock size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-2">{test.examName || test.name}</h2>
        <div className="mb-2 text-blue-700 font-semibold">{STREAM_LABELS[test.stream] || test.stream}</div>
        <div className="mb-4 text-xs text-gray-500 flex items-center gap-1">
          <Clock size={14} /> {new Date(test.startDateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
        </div>
        <div className="mb-4 text-gray-700">{test.description}</div>
        <h3 className="text-lg font-bold mb-2">Sections & Topics</h3>
        <div className="space-y-2 mb-4">
          {sectionMeta.map((meta, idx) => (
            <div key={meta.section} className="bg-blue-50 rounded px-3 py-2">
              <div className="font-semibold text-blue-800">{meta.label} ({meta.section})</div>
              <div className="text-xs text-gray-600">{meta.topics}</div>
              <div className="text-xs text-gray-500 mt-1">No. of Questions: {(test.sections?.find(s => s.name === meta.section)?.questions?.length) || 0}</div>
            </div>
          ))}
        </div>
        <div className="mb-2 text-xs text-gray-500">Please read all instructions carefully before starting the exam.</div>
        {test.canStart && (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mt-2">Take Test</button>
        )}
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('upcoming-exams');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { profile, loading: userLoading, error: userError } = useUser();
  const navigate = useNavigate();

  // Payment status check
  const { data: paymentStatus, isLoading: paymentLoading, isError: paymentError } = useCheckPaymentStatus();

  useEffect(() => {
    if (!paymentLoading && (paymentError || paymentStatus?.message !== 'Payment successful')) {
      navigate('/register');
    }
  }, [paymentLoading, paymentError, paymentStatus, navigate]);

  const {
    data: Tests,
    isLoading,
    error,
  } = useTests();

  const now = new Date();
  const filteredUpcomingTests = (Tests || []).filter(
    (test) => new Date(test.startDateTime) > now
  );
  const filteredLastTests = (Tests || []).filter(
    (test) => new Date(test.startDateTime) <= now
  );

  const sidebarItems = [
    { label: 'Upcoming Exams', icon: FileText, key: 'upcoming-exams' },
    { label: 'Last Exams', icon: BookOpen, key: 'last-exams' },
    { label: 'Profile Settings', icon: UserIcon, key: 'profile-settings' },
    { label: 'Account Settings', icon: Settings, key: 'account-settings' },
  ];

  if (userLoading || paymentLoading) return <Loading />;
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
        {activeSection === 'upcoming-exams' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Upcoming Exams</h2>
            {isLoading && <Loading />}
            {error && <ErrorPage message={error.message} />}
            {!isLoading && !error && (
              filteredUpcomingTests && filteredUpcomingTests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredUpcomingTests.map((test) => {
                    const canStart = new Date(test.startDateTime) <= now;
                    return (
                      <StudentTestCard
                        key={test.id}
                        test={{ ...test, canStart, streamLabel: STREAM_LABELS[test.stream] || test.stream }}
                        onClick={() => { setSelectedTest({ ...test, canStart }); setModalOpen(true); }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-gray-500">No upcoming exams found.</div>
              )
            )}
          </div>
        )}
        {activeSection === 'last-exams' && (
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Last Exams</h2>
            {isLoading && <Loading />}
            {error && <ErrorPage message={error.message} />}
            {!isLoading && !error && (
              filteredLastTests && filteredLastTests.length > 0 ? (
                <div className="space-y-4">
                  {filteredLastTests.map((test) => (
                    <StudentTestCard
                      key={test.id}
                      test={test}
                      onClick={() => { setSelectedTest(test); setModalOpen(true); }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">No past exams found.</div>
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
        <ExamDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} test={selectedTest} />
      </main>
    </div>
  );
};

export default StudentDashboard;
