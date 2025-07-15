import React from 'react';
import { GraduationCap, Shield, Users, School, User, MapPin, Lock, Heart, Building2, MessageCircle, CreditCard, UserCheck, BarChart3, CaseSensitive as University, Handshake, AlertTriangle, TrendingUp } from 'lucide-react';

const Guidelines = () => {
  const guidelines = [
    {
      id: 1,
      title: "One-Time Registration Model",
      description: "Students pay ₹2500 once for lifetime access to all services. Ensures affordability and builds long-term relationships without repeated costs.",
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Commitment to Merit-Based Services",
      description: "All scholarships, tests, and admissions help are offered purely based on performance. Builds credibility and ensures fairness across all student backgrounds.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Equal Access to All Students",
      description: "Urban and rural students get the same quality of services without discrimination. Promotes inclusivity and bridges the opportunity gap in education.",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Free Awareness Sessions in Schools",
      description: "Foundation offers career guidance and scholarship sessions in schools at no cost. Helps students who lack exposure to career and academic options.",
      icon: <School className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Personalized Career Counselling",
      description: "Students receive 1-on-1 career counselling tailored to their background and interests. Boosts clarity and confidence in decision-making.",
      icon: <User className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Verified Admission Support (India & Abroad)",
      description: "We guide students through the entire college/university admission process. Removes confusion and empowers students to reach the right institution.",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      id: 7,
      title: "Educational Integrity is Mandatory",
      description: "Any student submitting false or fake documents will be disqualified. Maintains the ethical standards of the Foundation.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      id: 8,
      title: "Privacy and Data Protection Policy",
      description: "Student data is protected and used only with proper consent. Builds trust and complies with digital responsibility.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 9,
      title: "Student-Centered Policies Only",
      description: "Every service, event, or feature is designed for the benefit of students. Ensures that the Foundation remains focused on its mission.",
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 10,
      title: "No Commercial or Political Affiliations",
      description: "My Nirdeshak Foundation does not promote political, religious, or commercial entities. Maintains neutrality and broad acceptance.",
      icon: <Building2 className="w-6 h-6" />
    },
    {
      id: 11,
      title: "Transparent Communication System",
      description: "Students are informed via email, dashboard, or SMS only. Prevents fraud, fake calls, and confusion.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      id: 12,
      title: "No Refund Once Services Start",
      description: "As services begin instantly after registration, no refund is applicable. Keeps operations efficient and prevents misuse.",
      icon: <CreditCard className="w-6 h-6" />
    },
    {
      id: 13,
      title: "One Student, One Account Rule",
      description: "Each student is allowed to register only once on the platform. Ensures fairness and avoids duplicate benefits.",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      id: 14,
      title: "Scholarship Transparency Dashboard",
      description: "Students can view their test scores and scholarship eligibility online. Builds accountability and avoids false promises.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: 15,
      title: "No Hidden University Promotions",
      description: "We list only verified and student-relevant universities. Maintains integrity and prevents biased recommendations.",
      icon: <University className="w-6 h-6" />
    },
    {
      id: 16,
      title: "Schools/NGOs Can Collaborate for Free",
      description: "We allow collaboration with schools and NGOs at no cost. Increases reach and supports grassroots educational development.",
      icon: <Handshake className="w-6 h-6" />
    },
    {
      id: 17,
      title: "Zero Tolerance for Cheating & Plagiarism",
      description: "Cheating in tests or document manipulation will lead to disqualification. Ensures fairness and respect for genuine talent.",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 18,
      title: "Feedback-Driven Improvement",
      description: "We continuously improve based on student, parent, and partner feedback. Builds a dynamic and responsive educational platform.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="backdrop-blur-sm p-8 rounded-full">
                <img
                  src="../../assets/LOGO.jpg"
                  alt="Logo"
                  className="rounded-full h-20 w-20"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              My Nirdeshak Foundation
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl font-light italic opacity-90 mb-8">
              "A Direction Towards Educational Transformation"
            </p>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed opacity-90">
                Our institutional guidelines establish a framework of
                excellence, integrity, and accessibility in educational
                services, ensuring equitable opportunities for all students
                while maintaining the highest standards of academic and ethical
                conduct.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Institutional Guidelines
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            These comprehensive guidelines govern our operations and ensure
            consistent delivery of quality educational services while
            maintaining transparency and accountability.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 group"
            >
              <div className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-50 group-hover:bg-blue-100 p-3 rounded-lg transition-colors duration-300 border border-blue-100">
                      <div className="text-blue-600">{guideline.icon}</div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start mb-4">
                      <span className="bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full mr-3 flex-shrink-0 mt-1">
                        {guideline.id.toString().padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold text-blue-900 leading-tight">
                        {guideline.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {guideline.description}
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

export default Guidelines;