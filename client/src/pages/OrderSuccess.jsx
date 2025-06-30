import React, { useEffect } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { useOrderComplete } from "../queries/useTestsQueries";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const { testId } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const {
    mutate: completeOrder,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useOrderComplete();

  useEffect(() => {
    if (testId && orderId) {
      completeOrder({ testId, orderId });
    }
  }, [testId, orderId, completeOrder]);

  if (!orderId || !testId) {
    return (
      <ErrorPage
        message="Missing order or test ID. Please contact support."
        icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
      />
    );
  }

  if (isLoading) {
    console.log("in the loading of the ordere");
    return <Loading message="Verifying payment..." />;
  }

  if (isError) {
    return (
      <ErrorPage
        message={error?.response?.data?.message || "We couldn't verify your payment. Please contact support if you were charged."}
        icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
      />
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your order was successful and you are now registered for the test.
          </p>

          <div className="mb-6 bg-gray-50 p-4 rounded-lg text-gray-700 text-sm border border-gray-200">
            <strong>Order ID:</strong> {orderId}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/dashboard/student"
              className="inline-block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Go to My Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }
  
  return null; 
};

export default OrderSuccess; 