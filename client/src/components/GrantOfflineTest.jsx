import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGrantTestToStudent } from "../queries/useTestsQueries";
import { useNotification } from "../contexts/NotificationContext";

function GrantOfflineTest() {
  const [grantForm, setGrantForm] = useState({
    testId: "",
    userId: "",
    amount: "",
    method: "OFFLINE",
  });

  const { showNotification } = useNotification();
  const grantTest = useGrantTestToStudent();

  const handleGrantTest = async (e) => {
    e.preventDefault();
    grantTest.mutate(
      {
        ...grantForm,
        amount: Number(grantForm.amount),
      },
      {
        onSuccess: () => {
          showNotification("Successfully granted offline test", "success");
          setGrantForm({
            testId: "",
            userId: "",
            amount: "",
            method: "OFFLINE",
          });
        },
        onError: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err.message ||
            "Failed to grant offline test";
          showNotification(msg, "error");
        },
      }
    );
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
        {/* Pen Icon (Left, no box/background) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{
              x: [0, 10, 0],
              rotate: [0, 5, -5, 0],
              transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          >
            <span className="text-8xl md:text-9xl">✏️</span>
          </motion.div>
        </motion.div>

        {/* Grant Form (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto md:mx-0"
        >
          <form
            onSubmit={handleGrantTest}
            className="bg-white/90 rounded-2xl shadow-xl p-6 border border-blue-100 flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold text-blue-700 text-center">
              Grant Offline Test
            </h2>
            <div>
              <label htmlFor="testId" className="block text-sm font-medium mb-2 text-blue-700">
                Test ID
              </label>
              <input
                type="text"
                id="testId"
                name="testId"
                value={grantForm.testId}
                onChange={(e) => setGrantForm({ ...grantForm, testId: e.target.value })}
                placeholder="Test ID"
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                disabled={grantTest.isPending}
              />
            </div>
            <div>
              <label htmlFor="userId" className="block text-sm font-medium mb-2 text-blue-700">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={grantForm.userId}
                onChange={(e) => setGrantForm({ ...grantForm, userId: e.target.value })}
                placeholder="User ID"
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                disabled={grantTest.isPending}
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font700 mb-2 text-blue-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={grantForm.amount}
                onChange={(e) => setGrantForm({ ...grantForm, amount: e.target.value })}
                placeholder="Amount"
                className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                min="0"
                required
                disabled={grantTest.isPending}
              />
            </div>
            <input type="hidden" name="method" value="OFFLINE" />
            <motion.button
              type="submit"
              className="bg-blue-600 text-white w-full px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={grantTest.isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {grantTest.isPending ? "Granting..." : "Grant Offline Test"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default GrantOfflineTest;
