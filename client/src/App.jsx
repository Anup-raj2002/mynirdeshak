import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import HowItWorks from './pages/HowItWorks';
import Scholarships from './pages/Scholarships';
import Registration from './pages/Registration';
import Contact from './components/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import UpcomingTests from './pages/UpcomingTest';

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
                <Route path="/exams" element={<UpcomingTests />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="order-success/:testId" element={<OrderComplete />} /> */}
                <Route path="/terms" element={<NotFound />} />
                <Route path="/privacy" element={<NotFound />} />
                <Route path="/refund" element={<NotFound />} />
                <Route path="/disclaimer" element={<NotFound />} />
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