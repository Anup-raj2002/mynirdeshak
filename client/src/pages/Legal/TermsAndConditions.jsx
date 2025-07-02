import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Users, 
  Award,
  BookOpen,
  Building,
  CreditCard,
  UserCheck,
  Star,
  GraduationCap,
  Calendar,
  Eye,
  TrendingUp,
  Lock,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const TermsAndConditions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Cycling animation for sparkles
    const timer = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);

    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const termsData = {
    'Section A': {
      title: 'Eligibility Criteria for Scholarship',
      icon: UserCheck,
      color: 'from-blue-600 to-slate-700',
      bgColor: 'from-blue-50 to-slate-50',
      accentColor: 'blue',
      terms: [
        {
          number: '1',
          title: 'Only Valid for Private or Direct Admission Colleges',
          description: 'Scholarships apply only to colleges that accept direct admissions.',
          why: 'Such colleges accept third-party fee transfers.',
          purpose: 'Ensures proper coordination and safe scholarship usage.',
          icon: Building
        },
        {
          number: '2',
          title: 'Not Valid for Government or Counseling-Based Admissions',
          description: 'Students admitted through online counseling or merit-based quotas are not eligible.',
          why: 'These platforms don\'t allow external financial intervention.',
          purpose: 'Prevents legal issues or fund rejections.',
          icon: AlertTriangle
        },
        {
          number: '3',
          title: 'No Support for Government Institutions',
          description: 'Scholarships won\'t be offered for government college admissions.',
          why: 'Such colleges already provide fee subsidies.',
          purpose: 'Funds are prioritized for students paying higher fees.',
          icon: Shield
        },
        {
          number: '4',
          title: 'Must Be a Full-Time Undergraduate Degree',
          description: 'Only regular bachelor\'s programs like B.A., B.Com., B.Tech, etc., are eligible.',
          why: 'Distance or part-time courses are excluded.',
          purpose: 'Focuses on long-term career-building programs.',
          icon: BookOpen
        },
        {
          number: '5',
          title: 'College Must Be UGC/AICTE Approved',
          description: 'Scholarships are applicable only for colleges approved by UGC or AICTE.',
          why: 'Avoids fund misuse at unrecognized institutions.',
          purpose: 'Protects students from fake or low-quality education.',
          icon: CheckCircle
        },
        {
          number: '6',
          title: 'Scholarship Not Available for Diploma or Religious Courses',
          description: 'Specialized, non-career-oriented programs are excluded.',
          why: 'Scholarships should go to mainstream higher education.',
          purpose: 'Helps students build strong career foundations.',
          icon: Award
        },
        {
          number: '7',
          title: 'Must Have 60% or More in Class 12',
          description: 'A minimum of 60% in the Class 12 board exams is required.',
          why: 'Maintains academic standards.',
          purpose: 'Recognizes students who have shown consistent performance.',
          icon: TrendingUp
        }
      ]
    },
    'Section B': {
      title: 'Scholarship Disbursement Terms',
      icon: CreditCard,
      color: 'from-slate-600 to-blue-700',
      bgColor: 'from-slate-50 to-blue-50',
      accentColor: 'slate',
      terms: [
        {
          number: '8',
          title: 'Scholarship Disbursed Only After Admission',
          description: 'Funds are provided only after the student secures college admission.',
          why: 'Ensures students are genuinely continuing their education.',
          purpose: 'Avoids providing funds to non-admitted or inactive students.',
          icon: Calendar
        },
        {
          number: '9',
          title: 'Must Inform Mynirdeshak Before Admission (Pre-Approval Required)',
          description: 'Students must notify Mynirdeshak and get approval for their selected college before admission.',
          why: 'Ensures the college is eligible and recognized.',
          purpose: 'Prevents fraud and secures fund distribution.',
          icon: CheckCircle
        },
        {
          number: '10',
          title: 'Scholarship Funds Will Be Paid Directly to the College',
          description: 'The amount is paid directly to the institution as tuition fee.',
          why: 'Eliminates chances of misusing the amount for personal purposes.',
          purpose: 'Promotes transparent and trackable fund usage.',
          icon: Building
        },
        {
          number: '11',
          title: 'Covers Tuition Fees Only (No Hostel/Books Allowance)',
          description: 'Only academic tuition fees are covered.',
          why: 'Focuses help on core education.',
          purpose: 'Maximizes the scholarship\'s educational value.',
          icon: BookOpen
        },
        {
          number: '12',
          title: 'Admission Must Be Done Within 90 Days of Result',
          description: 'Students must complete college admission within 3 months of scholarship result.',
          why: 'Keeps the process timely.',
          purpose: 'Ensures budget planning and fund flow.',
          icon: Clock
        },
        {
          number: '13',
          title: 'Scholarship Must Be Claimed Within 90 Days of Result Declaration',
          description: 'Students must submit all required documents and complete the process within this time.',
          why: 'Maintains an efficient cycle for disbursement.',
          purpose: 'Prevents long delays or fund mismanagement.',
          icon: Calendar
        }
      ]
    },
    'Section C': {
      title: 'Documentation & Verification',
      icon: FileText,
      color: 'from-blue-600 to-slate-700',
      bgColor: 'from-blue-50 to-slate-50',
      accentColor: 'blue',
      terms: [
        {
          number: '14',
          title: 'Proof of Admission Must Be Submitted',
          description: 'Admission letter, fee receipt, or student ID is mandatory.',
          why: 'Confirms admission status.',
          purpose: 'Ensures funds are given to genuine students only.',
          icon: FileText
        },
        {
          number: '15',
          title: 'Mandatory Document Verification (Aadhaar, Marksheet, etc.)',
          description: 'National ID, Class 12 marksheet, and any requested documents are compulsory.',
          why: 'Confirms student\'s identity and qualifications.',
          purpose: 'Prevents fake claims and identity fraud.',
          icon: UserCheck
        },
        {
          number: '16',
          title: 'Mynirdeshak Reserves the Right for Re-Verification',
          description: 'Team may re-check your documents before final payment.',
          why: 'Adds a security step.',
          purpose: 'Prevents fraud or institutional malpractice.',
          icon: Eye
        },
        {
          number: '17',
          title: 'Student Must Maintain Performance in College',
          description: 'Students must continue passing and progressing in their course.',
          why: 'Prevents wasting funds on non-serious students.',
          purpose: 'Encourages continuous academic effort.',
          icon: TrendingUp
        }
      ]
    },
    'Section D': {
      title: 'Promotion, Ethics, and Fair Use',
      icon: Star,
      color: 'from-slate-600 to-blue-700',
      bgColor: 'from-slate-50 to-blue-50',
      accentColor: 'slate',
      terms: [
        {
          number: '18',
          title: 'One-Time Scholarship per Student',
          description: 'A student can only benefit once from this scholarship.',
          why: 'Allows more students to benefit.',
          purpose: 'Keeps the system inclusive and fair.',
          icon: Users
        },
        {
          number: '19',
          title: 'Feedback or Testimonial May Be Requested',
          description: 'Winners may be asked to share a success story.',
          why: 'Builds credibility and trust in the platform.',
          purpose: 'Motivates and guides new applicants.',
          icon: Star
        },
        {
          number: '20',
          title: 'Optional Use of Name/Photo for Promotion',
          description: 'Student may allow their story and photo to be shared online.',
          why: 'Builds transparency and community trust.',
          purpose: 'Inspires more students to apply and believe in the mission.',
          icon: Eye
        },
        {
          number: '21',
          title: 'Any Violation of Rules Will Lead to Scholarship Cancellation',
          description: 'Lying, cheating, or not following rules will cancel your eligibility.',
          why: 'Ensures discipline and honesty.',
          purpose: 'Protects the value and seriousness of the scholarship.',
          icon: AlertTriangle
        },
        {
          number: '22',
          title: 'Final Decision Lies With Mynirdeshak Committee',
          description: 'In all disputes, the team\'s decision will be final and binding.',
          why: 'Prevents confusion or misuse of process.',
          purpose: 'Ensures lawful, smooth, and professional operations.',
          icon: Lock
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-64 h-64 rounded-full opacity-5 animate-pulse ${
              i % 2 === 0 ? 'bg-blue-400' : 'bg-slate-400'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-slate-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 relative overflow-hidden">
              {/* Animated sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className={`absolute w-4 h-4 text-blue-400 transition-all duration-1000 ${
                      animationPhase === i % 4 ? 'opacity-100 scale-110' : 'opacity-30 scale-90'
                    }`}
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${15 + (i % 3) * 25}%`,
                      transform: `rotate(${i * 45}deg)`
                    }}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-center mb-6 relative">
                <div className="bg-gradient-to-br from-blue-600 to-slate-700 p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300">
                  <Shield className="h-12 w-12 text-white animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
                Mynirdeshak Scholarship
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 mb-4 animate-fade-in">
                Terms & Conditions & Eligibility Criteria
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To be followed after qualifying in the scholarship exam
              </p>
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
                <p className="text-blue-800 font-medium">
                  These scholarship rules and criteria define who is eligible, how funds are 
                  disbursed, and under what conditions support is provided. They ensure that 
                  deserving students benefit in the most secure and transparent way.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          {Object.entries(termsData).map(([sectionKey, section], sectionIndex) => (
            <div 
              key={sectionKey}
              className={`mb-12 transform transition-all duration-1000 delay-${(sectionIndex + 1) * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              onMouseEnter={() => setHoveredCard(sectionKey)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-500 ${
                hoveredCard === sectionKey ? 'scale-105 shadow-2xl' : 'hover:shadow-lg'
              }`}>
                <div className={`bg-gradient-to-r ${section.color} p-6 relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shimmer" />
                  </div>
                  
                  <div className="flex items-center relative z-10">
                    <div className={`mr-4 text-white transform transition-all duration-300 ${
                      hoveredCard === sectionKey ? 'scale-110 rotate-12' : ''
                    }`}>
                      <section.icon className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{sectionKey}: {section.title}</h3>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        <span className="text-white/80 text-sm">{section.terms.length} Terms</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {section.terms.map((term, termIndex) => (
                      <div
                        key={term.number}
                        className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-500 ${
                          expandedSection === `${sectionKey}-${term.number}` 
                            ? 'shadow-lg border-blue-300 bg-gradient-to-r from-blue-50 to-slate-50' 
                            : 'hover:shadow-md hover:border-gray-300'
                        }`}
                        style={{ animationDelay: `${termIndex * 100}ms` }}
                      >
                        <button
                          onClick={() => setExpandedSection(expandedSection === `${sectionKey}-${term.number}` ? null : `${sectionKey}-${term.number}`)}
                          className={`w-full p-6 bg-gradient-to-r ${section.bgColor} hover:from-gray-50 hover:to-gray-100 transition-all duration-300 flex items-center justify-between group`}
                        >
                          <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                              {term.number}
                            </div>
                            <div className="text-left">
                              <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                {term.title}
                              </h4>
                              <div className="flex items-center">
                                <term.icon className={`h-5 w-5 text-${section.accentColor}-600 mr-2 transform transition-all duration-300 group-hover:scale-110`} />
                                <p className="text-gray-600 font-medium">Click to view details</p>
                              </div>
                            </div>
                          </div>
                          <div className={`transform transition-all duration-300 ${
                            expandedSection === `${sectionKey}-${term.number}` ? 'rotate-180' : 'group-hover:scale-110'
                          }`}>
                            {expandedSection === `${sectionKey}-${term.number}` ? (
                              <ChevronDown className="h-6 w-6 text-blue-600" />
                            ) : (
                              <ChevronRight className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        {expandedSection === `${sectionKey}-${term.number}` && (
                          <div className="bg-white border-t border-gray-200 p-6 animate-slideDown">
                            <div className="space-y-4">
                              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg transform hover:scale-105 transition-all duration-300">
                                <h5 className="font-bold text-blue-800 mb-2 flex items-center">
                                  <CheckCircle className="h-5 w-5 mr-2" />
                                  What It Means:
                                </h5>
                                <p className="text-blue-700">{term.description}</p>
                              </div>
                              
                              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg transform hover:scale-105 transition-all duration-300">
                                <h5 className="font-bold text-yellow-800 mb-2 flex items-center">
                                  <AlertTriangle className="h-5 w-5 mr-2" />
                                  Why?:
                                </h5>
                                <p className="text-yellow-700">{term.why}</p>
                              </div>
                              
                              <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-4 rounded-r-lg transform hover:scale-105 transition-all duration-300">
                                <h5 className="font-bold text-green-800 mb-2 flex items-center">
                                  <Star className="h-5 w-5 mr-2" />
                                  Purpose:
                                </h5>
                                <p className="text-green-700">{term.purpose}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Final Note */}
          <div className={`text-center transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-xl p-8 shadow-2xl text-white relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shimmer" />
              </div>
              
              <div className="flex items-center justify-center mb-4 relative z-10">
                <div className="transform hover:scale-110 transition-all duration-300">
                  <GraduationCap className="h-12 w-12 text-yellow-300 mr-3 animate-bounce" />
                </div>
                <h3 className="text-3xl font-bold">Final Note for Students</h3>
              </div>
              
              <blockquote className="text-xl leading-relaxed font-medium max-w-4xl mx-auto relative z-10">
                "Mynirdeshak's mission is to build a transparent and trustworthy 
                scholarship system that rewards deserving students. These rules ensure 
                funds are used wisely, education is prioritized, and real talent is recognized. 
                Kindly follow each step sincerely to benefit from this opportunity."
              </blockquote>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4">
                <Star className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 1000px;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;