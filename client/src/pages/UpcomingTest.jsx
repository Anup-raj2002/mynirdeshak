import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePublicTest } from "../queries/useTests";
import { useCreateOrder } from "../queries/useTests";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { load } from "@cashfreepayments/cashfree-js";
import { Clock, Calendar, Users, ShoppingCart, Info } from "lucide-react";

function formatDuration(start, end) {
  const diff = (new Date(end) - new Date(start)) / 1000;
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return `${hours ? hours + "h " : ""}${minutes}m`;
}

function formatCountdown(target) {
  const now = new Date();
  const end = new Date(target);
  const diff = end - now;
  if (diff <= 0) return "Closed";
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}

const UpcomingTests = () => {
  
  const testId = "YOUR_TEST_ID"; 
  const { data: test, isLoading } = usePublicTest(testId);
  const { user, isLoading: userLoading } = useUser();
  const { showNotification } = useNotification();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const [countdown, setCountdown] = useState("");

  
  useEffect(() => {
    if (!test?.registrationEndDateTime) return;
    const interval = setInterval(() => {
      setCountdown(formatCountdown(test.registrationEndDateTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [test]);

  
  useEffect(() => {
    load({ mode: import.meta.env.DEV ? "sandbox" : "production" }).then(setCashfree);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!test) return <div>No upcoming tests found.</div>;

  const handleRegister = async () => {
    if (!user) {
      localStorage.setItem("postLoginRedirect", location.pathname);
      navigate("/signup");
      return;
    }
    if (["admin", "course-manager", "instructor"].includes(user.role)) {
      showNotification("Registration is only for students.", "info");
      return;
    }
    if (!user.emailVerified) {
      showNotification("Please verify your email before registering.", "warning");
      return;
    }
    try {
      const orderRes = await createOrder.mutateAsync(test._id);
      const paymentSessionId = orderRes.payment_session_id;
      if (!cashfree) throw new Error("Payment gateway not loaded");
      await cashfree.checkout({ paymentSessionId, redirectTarget: "_self" });
    } catch (err) {
      showNotification(err.message || "Failed to start payment", "error");
    }
  };

  const isRegisterDisabled =
    !user ||
    ["admin", "course-manager", "instructor"].includes(user?.role) ||
    !test ||
    new Date(test.registrationEndDateTime) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{test.name}</h2>
            <span className="text-lg font-semibold text-blue-600">₹{test.price}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5" />
              {new Date(test.startDateTime).toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              Duration: {formatDuration(test.startDateTime, test.endDateTime)}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5" />
              {test.registration || 0} Registered
            </div>
            <div className="flex items-center gap-1">
              <Info className="w-5 h-5" />
              Registration closes in: <span className="font-semibold">{countdown}</span>
            </div>
          </div>
          <button
            className={`mt-4 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              isRegisterDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={() => setModalOpen(true)}
            disabled={isRegisterDisabled}
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">{test.name}</h2>
            <p className="mb-4 text-gray-700">{test.description}</p>
            <div className="mb-4 space-y-2">
              <div>
                <b>Start:</b> {new Date(test.startDateTime).toLocaleString()}
              </div>
              <div>
                <b>End:</b> {new Date(test.endDateTime).toLocaleString()}
              </div>
              <div>
                <b>Registration closes:</b> {new Date(test.registrationEndDateTime).toLocaleString()}
              </div>
              <div>
                <b>Duration:</b> {formatDuration(test.startDateTime, test.endDateTime)}
              </div>
              <div>
                <b>Total Registered:</b> {test.registration || 0}
              </div>
              <div>
                <b>Price:</b> ₹{test.price}
              </div>
            </div>
            <button
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                isRegisterDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              onClick={handleRegister}
              disabled={isRegisterDisabled}
            >
              {isRegisterDisabled
                ? user
                  ? "Registration Locked"
                  : "Login to Register"
                : "Buy/Register Now"}
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingTests;