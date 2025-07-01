"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  FileText,
  Users,
  Award,
  BookOpen,
  Calculator,
  TestTube,
  Microscope,
  TrendingUp,
  MapPin,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Timer,
  Lock,
  GraduationCap,
  Target,
  Lightbulb,
} from "lucide-react"

function UpcomingTests() {
  const [activeStream, setActiveStream] = useState("pcm")

  const examFormat = {
    totalQuestions: 100,
    questionsPerSection: 25,
    totalDuration: 100,
    durationPerSection: 25,
    sectionSwitching: false,
    questionType: "MCQs",
    correctMarks: "+2",
    wrongMarks: "–⅓",
    languages: ["Hindi", "English"],
    mode: "Online",
  }

  const streams = {
    pcm: {
      name: "PCM (Physics, Chemistry, Maths)",
      icon: <Calculator className="w-5 h-5" />,
      sections: [
        {
          section: "A",
          subject: "English",
          topics: "Comprehension, Grammar, Synonyms-Antonyms, Vocabulary",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          section: "B",
          subject: "Mathematics",
          topics: "Algebra, Trigonometry, Calculus, Probability",
          icon: <Calculator className="w-4 h-4" />,
        },
        {
          section: "C",
          subject: "Physics + Chemistry",
          topics: "Laws of Motion, Magnetism, Thermodynamics, Organic Chemistry, Atomic Structure",
          icon: <TestTube className="w-4 h-4" />,
        },
        {
          section: "D",
          subject: "Aptitude + Reasoning + GK",
          topics: "Number Series, Blood Relation, India GK, Logical Puzzle",
          icon: <Lightbulb className="w-4 h-4" />,
        },
      ],
    },
    pcb: {
      name: "PCB (Physics, Chemistry, Biology)",
      icon: <Microscope className="w-5 h-5" />,
      sections: [
        {
          section: "A",
          subject: "English",
          topics: "Reading Passage, Tenses, One Word Substitution",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          section: "B",
          subject: "Biology",
          topics: "Cell Structure, Genetics, Human Physiology, Botany",
          icon: <Microscope className="w-4 h-4" />,
        },
        {
          section: "C",
          subject: "Physics + Chemistry",
          topics: "Motion, Heat, Electrochemistry, Chemical Bonding",
          icon: <TestTube className="w-4 h-4" />,
        },
        {
          section: "D",
          subject: "Aptitude + Reasoning + GK",
          topics: "Clock & Calendar, Coding-Decoding, Static GK, Series",
          icon: <Lightbulb className="w-4 h-4" />,
        },
      ],
    },
    pcmb: {
      name: "PCMB (All Four Science Subjects)",
      icon: <GraduationCap className="w-5 h-5" />,
      sections: [
        {
          section: "A",
          subject: "English",
          topics: "Error Detection, Fill in the Blanks, Passage-based Questions",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          section: "B",
          subject: "Mathematics + Biology",
          topics: "Trigonometry, Differentiation, Anatomy, Plant Physiology",
          icon: <Calculator className="w-4 h-4" />,
        },
        {
          section: "C",
          subject: "Physics + Chemistry",
          topics: "Gravitation, Magnetism, Organic Chemistry, Equilibrium",
          icon: <TestTube className="w-4 h-4" />,
        },
        {
          section: "D",
          subject: "Aptitude + Reasoning + GK",
          topics: "Logical Sequences, Data Interpretation, Constitution, Current Affairs",
          icon: <Lightbulb className="w-4 h-4" />,
        },
      ],
    },
    commerce: {
      name: "Commerce (Accounts, Business, Economics)",
      icon: <TrendingUp className="w-5 h-5" />,
      sections: [
        {
          section: "A",
          subject: "English",
          topics: "Formal Letter, Sentence Correction, Vocabulary",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          section: "B",
          subject: "Accountancy + Business Studies",
          topics: "Ledger, Trial Balance, Marketing, Human Resource Management",
          icon: <Briefcase className="w-4 h-4" />,
        },
        {
          section: "C",
          subject: "Economics",
          topics: "National Income, Demand-Supply, Budget, Inflation",
          icon: <TrendingUp className="w-4 h-4" />,
        },
        {
          section: "D",
          subject: "Aptitude + Reasoning + GK",
          topics: "Arithmetic Aptitude, Series, Indian Economy, Awards",
          icon: <Lightbulb className="w-4 h-4" />,
        },
      ],
    },
    arts: {
      name: "Arts / Humanities",
      icon: <MapPin className="w-5 h-5" />,
      sections: [
        {
          section: "A",
          subject: "English",
          topics: "Grammar, Paragraph Completion, Idioms",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          section: "B",
          subject: "History + Political Science",
          topics: "Freedom Movement, Constitution, Fundamental Rights",
          icon: <Award className="w-4 h-4" />,
        },
        {
          section: "C",
          subject: "Geography + Economics",
          topics: "Climate, Maps, Budget, GDP",
          icon: <MapPin className="w-4 h-4" />,
        },
        {
          section: "D",
          subject: "Aptitude + Reasoning + GK",
          topics: "Series, Direction Test, Culture, Sports",
          icon: <Lightbulb className="w-4 h-4" />,
        },
      ],
    },
    others: {
      name: "Others (Vocational / ITI / Polytechnic / Open School)",
      icon: <Users className="w-5 h-5" />,
      sections: [
        {
          section: "A",
          subject: "English",
          topics: "Reading Skills, Parts of Speech, Word Meaning",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          section: "B",
          subject: "Communication + Personality Skills",
          topics: "Verbal Ability, Interpersonal Skills, Public Speaking",
          icon: <Users className="w-4 h-4" />,
        },
        {
          section: "C",
          subject: "General Knowledge",
          topics: "National Affairs, Scientific Facts, Current Events",
          icon: <Globe className="w-4 h-4" />,
        },
        {
          section: "D",
          subject: "Aptitude + Reasoning + GK",
          topics: "Verbal/Non-verbal, Basic Math, India's Heritage",
          icon: <Lightbulb className="w-4 h-4" />,
        },
      ],
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  }

  const sectionVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 md:py-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="flex justify-center mb-3 md:mb-4" variants={itemVariants}>
              <motion.div
                className="bg-white/20 p-3 md:p-4 rounded-full"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-8 h-8 md:w-12 md:h-12" />
              </motion.div>
            </motion.div>
            <motion.h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 px-2" variants={itemVariants}>
               Scholarship Exam
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-blue-100 mb-1 md:mb-2" variants={itemVariants}>
              For Class 12th Students
            </motion.p>
            <motion.p className="text-base md:text-lg text-blue-200" variants={itemVariants}>
              Structured, Fair & Stream-Specific
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 py-6 md:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* General Exam Format */}
        <motion.div
          className="mb-12 bg-white rounded-lg shadow-lg border border-blue-200 overflow-hidden"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="bg-blue-50 border-b border-blue-200 p-6">
            <h2 className="text-2xl text-blue-800 flex items-center gap-3 font-bold">
              <FileText className="w-6 h-6" />
              General Exam Format (Same for All Courses)
            </h2>
          </div>
          <div className="p-8">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
              variants={containerVariants}
            >
              <motion.div
                className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="bg-blue-600 text-white p-3 rounded-full w-fit mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-blue-800 mb-2">Total Questions</h3>
                <p className="text-2xl font-bold text-blue-600">{examFormat.totalQuestions}</p>
                <p className="text-sm text-gray-600">({examFormat.questionsPerSection} per section)</p>
              </motion.div>

              <motion.div
                className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="bg-blue-600 text-white p-3 rounded-full w-fit mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Clock className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-blue-800 mb-2">Total Duration</h3>
                <p className="text-2xl font-bold text-blue-600">{examFormat.totalDuration} Minutes</p>
                <p className="text-sm text-gray-600">({examFormat.durationPerSection} min per section)</p>
              </motion.div>

              <motion.div
                className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="bg-green-600 text-white p-3 rounded-full w-fit mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-blue-800 mb-2">Correct Answer</h3>
                <p className="text-2xl font-bold text-green-600">{examFormat.correctMarks} Marks</p>
              </motion.div>

              <motion.div
                className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="bg-red-600 text-white p-3 rounded-full w-fit mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <XCircle className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-blue-800 mb-2">Wrong Answer</h3>
                <p className="text-2xl font-bold text-red-600">{examFormat.wrongMarks} Negative Marking</p>
              </motion.div>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
              <motion.div
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Lock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Section Switching</p>
                  <p className="text-red-600 font-medium">Not Allowed</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Target className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Question Type</p>
                  <p className="text-blue-600 font-medium">{examFormat.questionType}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">Languages</p>
                  <p className="text-blue-600 font-medium">{examFormat.languages.join(" & ")}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stream-Wise Patterns */}
        <motion.div
          className="mb-12 bg-white rounded-lg shadow-lg border border-blue-200 overflow-hidden"
          variants={cardVariants}
        >
          <div className="bg-blue-50 border-b border-blue-200 p-6">
            <h2 className="text-2xl text-blue-800 flex items-center gap-3 font-bold">
              <BookOpen className="w-6 h-6" />
              Section-Wise Pattern for All Streams
            </h2>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-blue-50 p-2 gap-1">
              {Object.entries(streams).map(([key, stream]) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveStream(key)}
                  className={`flex flex-col md:flex-row items-center gap-2 p-3 rounded transition-all duration-200 text-sm font-medium ${
                    activeStream === key ? "bg-blue-600 text-white" : "bg-transparent text-gray-700 hover:bg-blue-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {stream.icon}
                  <span className="text-xs md:text-sm">{key.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStream}
                className="p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="mb-6" variants={itemVariants}>
                  <h3 className="text-xl font-bold text-blue-800 flex items-center gap-3 mb-2">
                    {streams[activeStream].icon}
                    {streams[activeStream].name}
                  </h3>
                </motion.div>

                <motion.div className="grid gap-6" variants={containerVariants} initial="hidden" animate="visible">
                  {streams[activeStream].sections.map((section, index) => (
                    <motion.div
                      key={section.section}
                      className="bg-white border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                      variants={sectionVariants}
                      custom={index}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <motion.div
                          className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {section.section}
                        </motion.div>
                        <div className="flex-1 w-full">
                          <div className="flex items-center gap-2 mb-2">
                            {section.icon}
                            <h4 className="text-lg font-semibold text-blue-800">{section.subject}</h4>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{section.topics}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Important Instructions */}
        <motion.div
          className="mb-12 bg-white rounded-lg shadow-lg border border-orange-200 overflow-hidden"
          variants={cardVariants}
        >
          <div className="bg-orange-50 border-b border-orange-200 p-6">
            <h2 className="text-2xl text-orange-800 flex items-center gap-3 font-bold">
              <AlertTriangle className="w-6 h-6" />
              Important Instructions for All Students
            </h2>
          </div>
          <div className="p-8">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
              <motion.div
                className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Timer className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800 mb-1">Time Lock System</p>
                  <p className="text-gray-700">Each section will automatically lock after 25 minutes.</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Lock className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800 mb-1">No Section Review</p>
                  <p className="text-gray-700">You cannot go back to a completed section.</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <GraduationCap className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800 mb-1">Eligibility</p>
                  <p className="text-gray-700">Only students currently studying in Class 12th can appear.</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <FileText className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-800 mb-1">Documentation</p>
                  <p className="text-gray-700">Use your school ID or equivalent document during registration.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Final Tip */}
        <motion.div
          className="bg-white rounded-lg shadow-lg border border-green-200 overflow-hidden"
          variants={cardVariants}
        >
          <div className="bg-green-50 border-b border-green-200 p-6">
            <h2 className="text-2xl text-green-800 flex items-center gap-3 font-bold">
              <Lightbulb className="w-6 h-6" />
              Final Tip
            </h2>
          </div>
          <div className="p-8">
            <motion.div
              className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-lg text-green-800 font-medium leading-relaxed">
                "Prepare section-wise with equal focus on your core subjects and general aptitude."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default UpcomingTests
