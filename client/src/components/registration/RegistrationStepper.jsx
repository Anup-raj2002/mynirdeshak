import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function RegistrationStepper({ stepTitles, stepIcons, currentStep }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mb-12">
      <div className="flex overflow-x-auto whitespace-nowrap gap-4 md:gap-8 items-center justify-between mb-6 px-2 md:px-0 scrollbar-thin scrollbar-thumb-gray-300">
        {stepTitles.map((title, index) => {
          const IconComponent = stepIcons[index];
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return (
            <div key={index} className="flex flex-col items-center flex-shrink-0 min-w-[80px] md:min-w-[120px]">
              <motion.div whileHover={{ scale: 1.1 }} className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border-2 mb-1 md:mb-2 transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : isActive ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-400 bg-white'}`}>
                {isCompleted ? <CheckCircle className="h-5 w-5 md:h-6 md:w-6" /> : <IconComponent className="h-5 w-5 md:h-6 md:w-6" />}
              </motion.div>
              <span className={`text-xs md:text-sm font-medium text-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>{title}</span>
              <span className={`text-xs mt-0.5 md:mt-1 ${isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : 'text-gray-400'}`}>Step {index + 1}</span>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / stepTitles.length) * 100}%` }} transition={{ duration: 0.5 }} className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" />
      </div>
    </motion.div>
  );
} 