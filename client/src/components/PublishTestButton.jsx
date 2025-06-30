import React from "react";
import { useUpdateTest } from "../queries/useTestsQueries";
import { Loader, CheckCircle, ShieldOff } from "lucide-react";

export default function PublishTestButton({ test }) {
  const { mutate, isLoading } = useUpdateTest();

  const handleTogglePublish = (e) => {
    e.stopPropagation();
    mutate({
      testId: test._id,
      updateData: { isPublished: !test.isPublished },
    });
  };

  const isPublished = test.isPublished;

  return (
    <button
      onClick={handleTogglePublish}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1 text-sm font-semibold border rounded-lg transition-colors duration-200 disabled:opacity-50
        ${
          isPublished
            ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
        }
      `}
    >
      {isLoading ? (
        <Loader className="animate-spin" size={16} />
      ) : isPublished ? (
        <>
          <CheckCircle size={16} />
          <span>Published</span>
        </>
      ) : (
        <>
          <ShieldOff size={16} />
          <span>Publish</span>
        </>
      )}
    </button>
  );
}
