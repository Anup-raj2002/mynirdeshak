import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import { load } from "@cashfreepayments/cashfree-js";
import TestCard from "../components/TestCard";
import NoUpcomingTests from "../components/NoUpcomingTests";
import Loading from "../components/Loading";

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

// Temporary test data for development/demo
const TEMP_TESTS = [
  {
    _id: "1",
    name: "Math Olympiad",
    price: 299,
    startDateTime: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    endDateTime: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    registrationEndDateTime: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    registration: 42,
    isPublished: true,
    description: "A challenging math competition for all levels.",
  },
  {
    _id: "2",
    name: "Physics Challenge",
    price: 199,
    startDateTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    endDateTime: new Date(Date.now() + 26 * 3600 * 1000).toISOString(),
    registrationEndDateTime: new Date(Date.now() + 23 * 3600 * 1000).toISOString(),
    registration: 18,
    isPublished: true,
    description: "Test your physics knowledge and win prizes!",
  },
  {
    _id: "3",
    name: "Chemistry Quiz",
    price: 149,
    startDateTime: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    endDateTime: new Date(Date.now() + 50 * 3600 * 1000).toISOString(),
    registrationEndDateTime: new Date(Date.now() + 47 * 3600 * 1000).toISOString(),
    registration: 25,
    isPublished: true,
    description: "Compete in our chemistry quiz and show your skills!",
  },
  {
    _id: "4",
    name: "Biology Bowl",
    price: 179,
    startDateTime: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    endDateTime: new Date(Date.now() + 74 * 3600 * 1000).toISOString(),
    registrationEndDateTime: new Date(Date.now() + 71 * 3600 * 1000).toISOString(),
    registration: 30,
    isPublished: true,
    description: "Join the Biology Bowl and test your knowledge of life sciences.",
  },
  {
    _id: "5",
    name: "English Literature Test",
    price: 129,
    startDateTime: new Date(Date.now() + 96 * 3600 * 1000).toISOString(),
    endDateTime: new Date(Date.now() + 98 * 3600 * 1000).toISOString(),
    registrationEndDateTime: new Date(Date.now() + 95 * 3600 * 1000).toISOString(),
    registration: 15,
    isPublished: true,
    description: "Show off your English literature expertise in this fun test!",
  },
  {
    _id: "6",
    name: "General Knowledge Marathon",
    price: 99,
    startDateTime: new Date(Date.now() + 120 * 3600 * 1000).toISOString(),
    endDateTime: new Date(Date.now() + 122 * 3600 * 1000).toISOString(),
    registrationEndDateTime: new Date(Date.now() + 119 * 3600 * 1000).toISOString(),
    registration: 50,
    isPublished: true,
    description: "A marathon of questions from all subjects. Are you up for the challenge?",
  },
];

const UpcomingTests = () => {
  const [tests] = useState(TEMP_TESTS);
  const [isLoading] = useState(false);
  const { user } = useUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [cashfree, setCashfree] = useState(null);
  const [countdowns, setCountdowns] = useState({});

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
    return isClosed || isStaff;
  };

  // Registration handler for the Register button
  const handleRegister = useCallback(
    (test) => {
      if (!user) {
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
      showNotification("Registration flow is disabled in demo mode.", "info");
    },
    [user, showNotification, navigate]
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