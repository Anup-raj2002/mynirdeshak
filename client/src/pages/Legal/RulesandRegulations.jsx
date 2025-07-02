import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  Lock, 
  FileText, 
  Users, 
  Target,
  BookOpen,
  Timer,
  Camera,
  Monitor,
  XCircle,
  Award,
  GraduationCap
} from 'lucide-react';

const RulesAndRegulations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const rulesData = {
    'Part A': {
      title: 'Basic Academic Rules',
      icon: BookOpen,
      color: 'from-blue-600 to-slate-700',
      bgColor: 'from-blue-50 to-slate-50',
      rules: [
        {
          number: '1',
          title: 'Minimum 70% of Questions Must Be Attempted',
          description: 'Every student must attempt at least 70% of total exam questions.',
          why: 'To make sure the student fully participates in the exam.',
          purpose: 'Discourages half-hearted attempts and promotes complete engagement.',
          icon: Target
        },
        {
          number: '2',
          title: 'Minimum 40 Correct Answers Required',
          description: 'Students need to answer at least 40 questions correctly to be eligible.',
          why: 'To maintain a minimum performance threshold.',
          purpose: 'Ensures only prepared and knowledgeable candidates qualify.',
          icon: CheckCircle
        },
        {
          number: '3',
          title: 'Disqualified If Wrong Answers > Correct Answers',
          description: 'If the student has more wrong answers than correct ones, they are disqualified.',
          why: 'To discourage wild guessing.',
          purpose: 'Maintains exam quality and fairness.',
          icon: XCircle
        },
        {
          number: '4',
          title: '1/3 Negative Marking for Every Wrong Answer',
          description: 'For each wrong answer, 1/3rd of the marks will be deducted.',
          why: 'Matches the seriousness of national competitive exams.',
          purpose: 'Promotes accuracy and thoughtful answering.',
          icon: AlertTriangle
        }
      ]
    },
    'Part B': {
      title: 'Section-Wise & Participation Rules',
      icon: Users,
      color: 'from-slate-600 to-blue-700',
      bgColor: 'from-slate-50 to-blue-50',
      rules: [
        {
          number: '5',
          title: 'Each Section Must Have at Least 12–15 Questions Attempted',
          description: 'Students must attempt 12–15 questions per section (e.g. English, Maths).',
          why: 'Encourages well-rounded preparation.',
          purpose: 'Prevents skipping weak subjects and promotes overall learning.',
          icon: BookOpen
        },
        {
          number: '6',
          title: 'No Scholarship If Any Section is Skipped',
          description: 'If a student leaves an entire section blank, they are ineligible for the scholarship.',
          why: 'To promote complete subject-wise participation.',
          purpose: 'Builds habits required for real-life competitive exams.',
          icon: Award
        }
      ]
    },
    'Part C': {
      title: 'Identity Verification & Monitoring',
      icon: Shield,
      color: 'from-blue-600 to-slate-700',
      bgColor: 'from-blue-50 to-slate-50',
      rules: [
        {
          number: '7',
          title: 'Biometric or Photo Verification Required',
          description: 'Students must upload a live selfie or allow biometric ID verification.',
          why: 'Ensures the person taking the test is the actual applicant.',
          purpose: 'Prevents impersonation or proxy attempts.',
          icon: Camera
        },
        {
          number: '8',
          title: 'Real-Time Proctoring (Optional for Premium Exams)',
          description: 'Some exams may require webcam/mic access for live monitoring.',
          why: 'Adds exam integrity and builds trust.',
          purpose: 'Maintains high-level examination standards.',
          icon: Eye
        },
        {
          number: '9',
          title: 'Auto Disqualification on Tab Switching or Multiple Login Attempts',
          description: 'The exam will auto-cancel if the user switches tabs, opens other windows, or tries logging in on multiple devices.',
          why: 'Prevents internet-based cheating.',
          purpose: 'Promotes fair conduct during online exams.',
          icon: Monitor
        }
      ]
    },
    'Part D': {
      title: 'Exam Time & Discipline',
      icon: Clock,
      color: 'from-slate-600 to-blue-700',
      bgColor: 'from-slate-50 to-blue-50',
      rules: [
        {
          number: '10',
          title: 'Time-Limit Enforcement Per Section',
          description: 'Each subject section must be completed in a set time limit.',
          why: 'Helps avoid over-focus on strong areas and under-performance in others.',
          purpose: 'Promotes time discipline and uniform effort.',
          icon: Timer
        },
        {
          number: '11',
          title: 'Strict Anti-Cheating Policy',
          description: 'If a student is found cheating or using unfair means, they will be permanently disqualified.',
          why: 'Protects honest students.',
          purpose: 'Maintains trust, discipline, and integrity in the scholarship system.',
          icon: Lock
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100 relative">
      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-600 p-3 rounded-lg shadow-md">
                  <FileText className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                Mynirdeshak Scholarship Exam
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-600 mb-4">
                Rules & Eligibility
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To be followed before and during the scholarship examination
              </p>
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  These rules are designed to promote discipline, fairness, and transparency — 
                  ensuring that only deserving, serious, and sincere students qualify.
                </p>
              </div>
            </div>
          </div>

          {/* Rules Sections */}
          {Object.entries(rulesData).map(([partKey, part], partIndex) => (
            <div 
              key={partKey}
              className={`mb-12 transform transition-all duration-1000 delay-${(partIndex + 1) * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className={`bg-gradient-to-r ${part.color} p-6`}>
                  <div className="flex items-center">
                    <div className="mr-4 text-white">
                      <part.icon className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{partKey}: {part.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {part.rules.map((rule, ruleIndex) => (
                      <div
                        key={rule.number}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                      >
                        <button
                          onClick={() => setExpandedSection(expandedSection === `${partKey}-${rule.number}` ? null : `${partKey}-${rule.number}`)}
                          className={`w-full p-6 bg-gradient-to-r ${part.bgColor} hover:from-gray-50 hover:to-gray-100 transition-all duration-300 flex items-center justify-between`}
                        >
                          <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${part.color} flex items-center justify-center text-white font-bold text-lg mr-4 shadow-md`}>
                              {rule.number}
                            </div>
                            <div className="text-left">
                              <h4 className="text-lg font-bold text-gray-800 mb-1">{rule.title}</h4>
                              <div className="flex items-center">
                                <rule.icon className="h-5 w-5 text-blue-600 mr-2" />
                                <p className="text-gray-600 font-medium">Click to view details</p>
                              </div>
                            </div>
                          </div>
                        </button>
                        
                        {expandedSection === `${partKey}-${rule.number}` && (
                          <div className="bg-white border-t border-gray-200 p-6">
                            <div className="space-y-4">
                              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                <h5 className="font-bold text-blue-800 mb-2">What It Means:</h5>
                                <p className="text-blue-700">{rule.description}</p>
                              </div>
                              
                              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                <h5 className="font-bold text-yellow-800 mb-2">Why?:</h5>
                                <p className="text-yellow-700">{rule.why}</p>
                              </div>
                              
                              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                <h5 className="font-bold text-green-800 mb-2">Purpose:</h5>
                                <p className="text-green-700">{rule.purpose}</p>
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
            <div className="bg-blue-600 rounded-lg p-8 shadow-lg text-white">
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="h-12 w-12 text-yellow-300 mr-3" />
                <h3 className="text-3xl font-bold">Final Note to Students</h3>
              </div>
              
              <blockquote className="text-xl leading-relaxed font-medium max-w-4xl mx-auto">
                "Mynirdeshak is committed to supporting students who are serious, 
                hardworking, and sincere about their future. These exam rules are 
                designed to filter deserving candidates and offer fair opportunity to all. 
                Follow them sincerely to open the doors of scholarship success."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesAndRegulations;