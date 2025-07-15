import React from 'react';
import { CreditCard, Shield, Users, Clock, FileText, AlertTriangle, CheckCircle, XCircle, RefreshCw, Scale, MessageCircle } from 'lucide-react';

const RefundPolicy = () => {
  const policyData = [
    {
      id: 1,
      title: "Purpose of the Policy",
      description: "This policy outlines the terms under which users may cancel services or request refunds for programs, consultations, assessments, and events offered by My Nirdeshak. Our goal is to ensure clarity and build trust by providing a fair, student-centric resolution process.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Scope of Services Covered",
      description: "This policy applies to payments made for: Career Counseling Sessions, Educational Consultancy, Domain-Specific Assessments, Scholarship Test Registrations, Webinars/Workshops, Awareness Sessions, and Subscription-Based Tools.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Service Cancellation Terms",
      description: "Voluntary cancellations are permitted if requested at least 48 hours before the scheduled service. Cancellation requests must be sent to mynirdeshak@gmail.com with full details. No refund will be issued for cancellations made after the scheduled service has begun.",
      icon: <XCircle className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Refund Eligibility Criteria",
      description: "Refunds will be considered for: Duplicate or multiple payments, Service not delivered due to internal technical fault, Cancellation within the eligible time frame, Non-usage of any part of the service, and Scheduled session/test cancelled by My Nirdeshak.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Non-Refundable Conditions",
      description: "Refunds will not be issued for: Missed or unattended sessions by the student, Partially used packages or programs, Scholarship or promotional test fees after the test date, Downloaded or accessed digital content, and Cancellation after declared results or awards.",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Refund Process and Timeline",
      description: "Approved refunds will be processed within 3 working days. Refund will reflect in the original payment mode within 7–10 business days. Refund confirmation and reference number will be emailed to the user.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      id: 7,
      title: "Required Details for Refund Request",
      description: "To initiate a refund, users must provide: Full Name, Registered Email/Mobile Number, Transaction ID or Payment Receipt, Date of Payment, Reason for Refund, and Copy of Confirmation Email (if available).",
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 8,
      title: "Technical Failure Refunds",
      description: "If the user is unable to access the service due to our technical fault, a full refund or rescheduling will be provided. No refund will be given for issues arising from the user's device, internet, or compatibility issues.",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 9,
      title: "Duplicate Transaction Refunds",
      description: "Verified duplicate payments for the same service will be fully refunded.",
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 10,
      title: "Subscription Refunds",
      description: "Refund for subscription services is allowed within 7 days of purchase and only if no premium features were accessed. Auto-renewal payments are non-refundable, but cancellation of future renewals is allowed.",
      icon: <RefreshCw className="w-6 h-6" />
    },
    {
      id: 11,
      title: "Discounted or Promotional Offers",
      description: "Payments made under special offers, discounts, or scholarship-linked pricing are non-refundable. These are provided as incentives and are not covered under regular refund terms.",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 12,
      title: "Scholarship Misuse or Disqualification",
      description: "If a user is disqualified due to false documents, fake claims, or cheating, no refund will be issued for the service or test fee. All associated benefits may also be revoked.",
      icon: <XCircle className="w-6 h-6" />
    },
    {
      id: 13,
      title: "Rescheduling Policy",
      description: "Users can reschedule a booked session/test once for free with at least 24 hours' notice. Further rescheduling requests may be chargeable or declined.",
      icon: <RefreshCw className="w-6 h-6" />
    },
    {
      id: 14,
      title: "Third-Party Payment Gateways",
      description: "Refund processing time may vary based on the policies of banks/payment gateways like Razorpay, Paytm, etc. We are not liable for external delays once the refund is initiated.",
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 15,
      title: "Tax and Service Charges",
      description: "Refunds may exclude applicable taxes, gateway charges, or administrative fees unless the entire service was cancelled due to our error.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 16,
      title: "Refund Communication and Tracking",
      description: "A Refund Reference Number (RRN) will be shared with the user. You may email us or visit our refund tracking portal (if available) for updates.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      id: 17,
      title: "Abuse of Policy",
      description: "Users repeatedly requesting refunds or abusing free/discounted services may be blacklisted or denied future services.",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 18,
      title: "Final Decision Authority",
      description: "All refund and cancellation requests are subject to review by the My Nirdeshak Admin Team. Our decision will be final and binding in all cases.",
      icon: <Scale className="w-6 h-6" />
    },
    {
      id: 19,
      title: "Legal Jurisdiction",
      description: "This policy is governed by Indian Law. All disputes are subject to the jurisdiction of Greater Noida, Uttar Pradesh courts.",
      icon: <Scale className="w-6 h-6" />
    },
    {
      id: 20,
      title: "Contact Information",
      description: "For any refund or cancellation-related queries, please contact us through the provided channels below.",
      icon: <MessageCircle className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
              <div className="bg-white bg-opacity-20 p-3 sm:p-4 lg:p-6 rounded-full backdrop-blur-sm">
                <CreditCard className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 tracking-tight px-2">
              Refund and Cancellation Policy
            </h1>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-white mx-auto mb-3 sm:mb-4 lg:mb-6"></div>
            <p className="text-lg sm:text-xl lg:text-2xl font-light italic opacity-90 mb-3 sm:mb-4 px-4">
              My Nirdeshak Foundation
            </p>
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed opacity-90">
                Applicable to all users of My Nirdeshak including students, parents, and educational institutions.
                This comprehensive policy ensures transparency and fairness in all refund and cancellation processes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-3 sm:mb-4 px-2">
            Policy Terms and Conditions
          </h2>
          <div className="w-12 sm:w-16 lg:w-20 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Our refund and cancellation policy is designed to provide clarity and ensure fair treatment 
            for all users while maintaining the integrity of our educational services.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
          {policyData.map((policy) => (
            <div
              key={policy.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 group"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-50 group-hover:bg-blue-100 p-2 sm:p-3 rounded-lg transition-colors duration-300 border border-blue-100">
                      <div className="text-blue-600">
                        {policy.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start mb-3 sm:mb-4">
                      <span className="bg-blue-900 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full mr-2 sm:mr-3 flex-shrink-0 mt-1">
                        {policy.id.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold text-blue-900 leading-tight">
                        {policy.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;