import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { load } from "@cashfreepayments/cashfree-js";
import { useCreateOrder } from '../../queries/useTestsQueries';
import { useNotification } from '../../contexts/NotificationContext';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function StepDeclarationPayment({ formData, onChange }) {
  const [cashfree, setCashfree] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: createOrder } = useCreateOrder();
  const { showNotification } = useNotification();
  const { profile, loading } = useUser();
  const navigate = useNavigate();

  // Load Cashfree SDK on mount
  useEffect(() => {
    const initSDK = async () => {
      try {
        const sdk = await load({
          mode: import.meta.env.DEV ? "sandbox" : "production",
        });
        setCashfree(sdk);
      } catch (err) {
        showNotification("Failed to initialize payment gateway", "error");
      }
    };
    initSDK();
  }, [showNotification]);

  // Redirect if not logged in
  useEffect(() => {
    if (loading) return;
    if (!profile) {
      localStorage.setItem("postLoginRedirect", location.pathname);
      navigate("/login", { replace: true });
    }
  }, [profile, loading, navigate]);

  const isStudent = profile?.role?.toLowerCase() === 'student';
  const canPay = formData.allDetailsCorrect && formData.acknowledgment && !isLoading && isStudent;

  const handlePayment = async () => {
    if (!canPay) return;
    setIsLoading(true);
    try {
      const response = await createOrder(formData.phone);
      const paymentSessionId = response?.order_token || response?.paymentSessionId || response?.payment_session_id;
      if (!paymentSessionId) throw new Error("Payment session not created");
      if (!cashfree) throw new Error("Payment gateway not loaded");
      await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      showNotification(
        err?.response?.data?.message || err.message || "Failed to process payment",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-2xl w-fit mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Declaration & Payment</h2>
        <p className="text-gray-600 mt-2">Please review and accept our terms</p>
      </div>
      <div className="bg-gray-50 rounded-2xl p-6 max-h-96 overflow-y-auto mb-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Rules & Guidelines</h3>
        <div className="space-y-4 text-sm text-gray-700">
          <p>1. All information provided must be true and correct to the best of your knowledge.</p>
          <p>2. Any false information may lead to disqualification.</p>
          <p>3. Please read the full rules and guidelines on our <a href="/rules" target="_blank" className="text-blue-600 underline">Rules & Guidelines</a> page.</p>
          <p>4. By submitting, you agree to our terms and privacy policy.</p>
        </div>
      </div>
      <div className="flex items-start space-x-3 mb-4">
        <input type="checkbox" name="allDetailsCorrect" checked={formData.allDetailsCorrect} onChange={onChange} className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
        <span className="text-sm text-gray-700 leading-relaxed">I confirm that all the details provided are correct to the best of my knowledge.</span>
      </div>
      <div className="flex items-start space-x-3 mb-4">
        <input type="checkbox" name="acknowledgment" checked={formData.acknowledgment} onChange={onChange} className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
        <span className="text-sm text-gray-700 leading-relaxed">I have read and agree to the rules, guidelines, and privacy policy.</span>
      </div>
      {!isStudent && profile && (
        <div className="text-red-600 text-sm mb-2">
          Only students can pay the registration fee.
        </div>
      )}
      <button
        type="button"
        onClick={handlePayment}
        disabled={!canPay}
        className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 ${canPay ? '' : 'opacity-50 cursor-not-allowed'}`}
      >
        {isLoading ? 'Processing...' : 'Pay Registration Fee'}
      </button>
    </motion.div>
  );
}