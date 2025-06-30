import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import {
  useTests,
  useUpdateTest,
  useDeleteTest,
} from "../queries/useTestsQueries";
import LoadingPage from "../ui/LoadingPage";
import ErrorPage from "../ui/ErrorPage";
import PublishTestButton from "./PublishTestButton";
import TestModal from "./TestModal";

const MyTests = () => {
  const { profile: user } = useUser();
  const { showNotification } = useNotification();

  const {
    data: allTests,
    isLoading,
    error,
    refetch: refetchTests,
  } = useTests();
  const { mutateAsync: updateTest } = useUpdateTest();
  const { mutateAsync: deleteTest } = useDeleteTest();

  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;

  const tests = allTests?.filter((t) => t.instructorId === user?._id) ?? [];

  const handleDelete = async (id) => {
    if (!confirm("Delete this test?")) return;
    try {
      await deleteTest(id);
      showNotification("Test deleted ✅", "success");
      refetchTests();
    } catch {
      showNotification("Failed to delete test", "error");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">My Tests</h2>
      {tests.length === 0 && (
        <p className="text-gray-600">No tests found. Create one!</p>
      )}
      {tests.map((test) => (
        <div
          key={test._id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => setSelectedTestId(test._id)}
        >
          <h3 className="text-xl font-semibold">{test.name}</h3>
          <p className="text-sm text-gray-500">ID: {test._id}</p>
          <p className="mt-2 text-gray-700">{test.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <PublishTestButton testId={test._id} />
            <button
              className="px-3 py-1 bg-red-100 text-red-700 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(test._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {selectedTestId && (
        <TestModal
          testId={selectedTestId}
          onClose={() => {
            setSelectedTestId(null);
            refetchTests();
          }}
        />
      )}
    </div>
  );
};

export default MyTests;
