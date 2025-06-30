import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { load } from "@cashfreepayments/cashfree-js";
import TestCard from "../components/TestCard";
import NoUpcomingTests from "../components/NoUpcomingTests";
import Loading from "../components/Loading";
import { useCreateOrder, usePublicTests } from "../queries/useTestsQueries";

// Utility to format duration between two dates
function formatDuration(start, end) {
  const diff = (new Date(end) - new Date(start)) / 1000;
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return `${hours ? hours + "h " : ""}${minutes}m`;
}

// Utility to format countdown to a target date
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
  const { data: tests, isLoading } = usePublicTests();
  const { profile: user } = useUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [cashfree, setCashfree] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const purchaseMutation = useCreateOrder();

  useEffect(() => {
    load({ mode: import.meta.env.DEV ? "sandbox" : "production" }).then(setCashfree);
  }, []);

  useEffect(() => {
    if (!Array.isArray(tests)) return;
    const updateCountdowns = () => {
      const newCountdowns = {};
      tests.forEach((test) => {
        newCountdowns[test._id] = formatCountdown(test.registrationEndDateTime);
      });
      setCountdowns(newCountdowns);
    };
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [tests]);

  const isRegisterDisabled = (test) => {
    const now = new Date();
    const isClosed = new Date(test.registrationEndDateTime) < now;
    const isStaff = user && ["admin", "test-manager", "instructor"].includes(user.role);
    return isClosed || isStaff || purchaseMutation.isPending;
  };

  const doPayment = async (paymentSessionId) => {
    if (!cashfree) {
      showNotification("Payment gateway not working", "error");
      return;
    }

    try {
      let checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_self",
      };
      await cashfree.checkout(checkoutOptions);
    } catch (error) {
      showNotification("Failed to process payment", "error");
    }
  };

  // Registration handler for the Register button
  const handleRegister = useCallback(
    async (test) => {
      if (!user) {
        localStorage.setItem("postLoginRedirect", "/exams");
        navigate("/login");
        return;
      }
      if (["admin", "test-manager", "instructor"].includes(user.role)) {
        showNotification("Registration is only for students.", "info");
        return;
      }
      if (!user.emailVerified) {
        showNotification("Please verify your email before registering.", "warning");
        return;
      }
      
      try {
        const purchaseResponse = await purchaseMutation.mutateAsync(test._id);
        const paymentSessionId = purchaseResponse.payment_session_id;
        await doPayment(paymentSessionId);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to process payment";
        showNotification(errorMessage, "error");
      }
    },
    [user, navigate, showNotification, purchaseMutation, cashfree]
  );

  if (isLoading) return <Loading />;
  if (!Array.isArray(tests) || tests.length === 0) return <NoUpcomingTests />;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tests.map((test) => (
          <TestCard
            key={test._id}
            test={{
              ...test,
              duration: formatDuration(test.startDateTime, test.endDateTime),
            }}
            isRegisterDisabled={isRegisterDisabled(test)}
            countdown={countdowns[test._id]}
            description={test.description}
            onRegister={() => handleRegister(test)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTests;