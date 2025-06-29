import React from 'react';

const NoUpcomingTests = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="90" fill="#E0E7FF"/>
      <rect x="45" y="70" width="90" height="50" rx="10" fill="#6366F1"/>
      <rect x="60" y="85" width="60" height="10" rx="5" fill="#A5B4FC"/>
      <rect x="60" y="100" width="40" height="8" rx="4" fill="#A5B4FC"/>
      <circle cx="130" cy="120" r="8" fill="#A5B4FC"/>
      <circle cx="50" cy="120" r="8" fill="#A5B4FC"/>
    </svg>
    <h2 className="mt-8 text-xl font-semibold text-gray-700">No Upcoming Tests</h2>
    <p className="text-gray-500 mt-2">Check back later for new opportunities!</p>
  </div>
);

export default NoUpcomingTests; 