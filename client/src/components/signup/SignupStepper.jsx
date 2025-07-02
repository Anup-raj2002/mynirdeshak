import React from 'react';

const SignupStepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {/* Step 1 */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-400'} text-xl font-bold transition-all duration-200`}>1</div>
      </div>
      {/* Line */}
      <div className={`h-1 w-16 mx-2 ${currentStep === 1 ? 'bg-blue-600' : 'bg-blue-200'} transition-all duration-200`}></div>
      {/* Step 2 */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep === 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-400'} text-xl font-bold transition-all duration-200`}>2</div>
      </div>
    </div>
  );
};

export default SignupStepper; 