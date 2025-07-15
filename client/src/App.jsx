import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import Scholarships from './pages/public/Scholarships';
import Registration from './pages/registration/Registration';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/NotFound';
import ExamInfo from './pages/public/ExamInfo';
import ErrorPage from './components/ui/ErrorPage';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TestManagerDashboard from './pages/dashboards/TestManagerDashboard';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import OrderSuccess from './pages/registration/OrderSuccess';
import TermsAndConditions from './pages/Legal/TermsAndConditions';
import RulesAndRegulations from './pages/Legal/RulesandRegulations';
import Global from'./pages/public/Global';
import Guidelines from './pages/Legal/Guidelines';
import RefundPolicy from './pages/Legal/RefundPolicy';
import TestTakingPage from './pages/test/TestTakingPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isTestPage = location.pathname.startsWith('/test/');

  return (
      <NotificationProvider>
        <UserProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {!isTestPage && <Header />}
            <ScrollToTop />
            <main className={isTestPage ? "" : "pt-20"}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/exam-info" element={<ExamInfo />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/manager" element={<TestManagerDashboard />} />
                <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/rules" element={<RulesAndRegulations />} />
                <Route path="/privacy" element={<ErrorPage message='create privacy policy'/>} />
                <Route path="/refund" element={<ErrorPage message='create refund page' />} />
                <Route path="/disclaimer" element={<ErrorPage message='create disclaimer' />} />
                <Route path="/test/:testId" element={<TestTakingPage />} />
                <Route path="/global" element={<Global />} />
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                
                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            {!isTestPage && <Footer />}
          </div>
        </UserProvider>
      </NotificationProvider>
  );
}

export default App;