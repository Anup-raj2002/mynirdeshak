import React, { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useTests, useDeleteTest } from "../queries/useTestsQueries";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import EmptyTests from "./EmptyTests";
import TestCard from "./TestCard";
//import TestModal from "./TestModal";

const MyTests = () => {
  const { showNotification } = useNotification();

  const {
    data: tests,
    isLoading,
    error,
  } = useTests();
  const { mutateAsync: deleteTest } = useDeleteTest();

  const [selectedTestId, setSelectedTestId] = useState(null);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test? This action cannot be undone.")) return;
    try {
      await deleteTest(id);
      showNotification("Test deleted successfully.", "success");
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to delete test.", "error");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Tests</h1>
          {/* <button
            onClick={() => setSelectedTestId("new")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Create Test
          </button> */}
        </div>

        {tests && tests.length > 0 ? (
          <div className="space-y-4">
            {tests.map((test) => (
              <TestCard
                key={test._id}
                test={test}
                onSelect={() => setSelectedTestId(test._id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyTests />
        )}

        {/* {selectedTestId && (
          <TestModal
            testId={selectedTestId}
            onClose={() => {
              setSelectedTestId(null);
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default MyTests;
