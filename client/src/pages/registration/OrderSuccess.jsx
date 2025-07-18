import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { useCheckPaymentStatus } from "../../queries/useTestsQueries";
import { useSubmitRegistration } from "../../queries/useFormsQueries";
import Loading from "../../components/ui/Loading";
import ErrorPage from "../../components/ui/ErrorPage";
import { motion } from "framer-motion";
import { useNotification } from "../../contexts/NotificationContext";
import { useUser } from "../../contexts/UserContext";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_STEP_KEY } from "./Registration";

const REGISTRATION_SUBMITTED_KEY = "registrationSubmittedOrderId";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const { profile: user, loading: userLoading, error: userError } = useUser();
  const orderId = searchParams.get("order_id");
  const submitRegistration = useSubmitRegistration();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);
  const { showNotification } = useNotification();
  const {
    isLoading,
    isError,
    error,
  } = useCheckPaymentStatus(orderId);

  React.useEffect(() => {
    if (!orderId || !user) return;
    const alreadySubmittedOrderId = localStorage.getItem(REGISTRATION_SUBMITTED_KEY);
    if (alreadySubmittedOrderId === orderId) {
      showNotification("You have already registered.", "info");
      setHasSubmitted(true);
      return;
    }
    const regData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!regData) showNotification("Registration data not found", 'error');
    submitRegistration.mutate(JSON.parse(regData),
      {
        onSuccess: () => {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          localStorage.removeItem(LOCAL_STORAGE_STEP_KEY);
          localStorage.setItem(REGISTRATION_SUBMITTED_KEY, orderId);
          setHasSubmitted(true);
          showNotification("Registration submitted successfully!", "success");
        },
        onError: (err) => {
          const msg = err?.response?.data?.message || err?.message || "Failed to submit registration. Please contact support.";
          setSubmitError(msg);
          showNotification(msg, "error");
        },
      }
    );
  }, [orderId, hasSubmitted, user]);

  if (!orderId) {
    return (
      <ErrorPage
        message="Missing order Id. Please contact support."
        icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
      />
    );
  }
  if (userLoading) {
    return <Loading message="Loading your profile..." />;
  }

  if (userError) {
    return (
      <ErrorPage
        message={userError}
        icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
      />
    );
  }

  if (isLoading) {
    return <Loading message="Verifying payment..." />;
  }

  if (isError) {
    return (
      <ErrorPage
        message={error?.response?.data?.message || "We couldn't verify your payment. Please contact support if you were charged. Order Id " + orderId}
        icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
      />
    );
  }

  if (submitRegistration.isLoading) {
    return <Loading message="Submitting registration..." />;
  }

  if (submitError) {
    return (
      <ErrorPage
        message={submitError}
        icon={<XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />}
      />
    );
  }

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

export default OrderSuccess; 