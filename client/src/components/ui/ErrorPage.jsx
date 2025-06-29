import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ message = "Something went wrong.", statusCode = null }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <AlertTriangle className="text-red-500 w-16 h-16 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {statusCode ? `Error ${statusCode}` : "Oops!"}
        </h1>

        <p className="text-gray-600 mb-4">{message}</p>

        <Link
          to="/"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
