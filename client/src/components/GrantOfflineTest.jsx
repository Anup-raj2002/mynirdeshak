import React, { useState } from "react";
import { useGrantTestToStudent } from "../queries/useTestsQueries"
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
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Grant Offline Test</h2>
      <form onSubmit={handleGrantTest} className="flex flex-col gap-4">
        <input
          type="text"
          name="testId"
          value={grantForm.testId}
          onChange={(e) => setGrantForm({ ...grantForm, testId: e.target.value })}
          placeholder="Test ID"
          className="border border-blue-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={grantTest.isPending}
        />
        <input
          type="text"
          name="userId"
          value={grantForm.userId}
          onChange={(e) => setGrantForm({ ...grantForm, userId: e.target.value })}
          placeholder="User ID"
          className="border border-blue-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={grantTest.isPending}
        />
        <input
          type="number"
          name="amount"
          value={grantForm.amount}
          onChange={(e) => setGrantForm({ ...grantForm, amount: e.target.value })}
          placeholder="Amount"
          className="border border-blue-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          min="0"
          required
          disabled={grantTest.isPending}
        />
        <input type="hidden" name="method" value="OFFLINE" />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={grantTest.isPending}
        >
          {grantTest.isPending ? "Granting..." : "Grant Offline Test"}
        </button>
      </form>
    </div>
  );
}

export default GrantOfflineTest; 