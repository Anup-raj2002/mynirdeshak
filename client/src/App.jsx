import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <NotificationProvider>
        <UserProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header />
            <ScrollToTop />
            <main className="pt-20">
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </UserProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;