import React from 'react';
import { FilePlus2 } from 'lucide-react';

const EmptyTests = () => (
  <div className="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
    <FilePlus2 className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-4 text-lg font-semibold text-gray-800">No Tests Found</h3>
    <p className="mt-2 text-sm text-gray-500">
      No instructor has created any tests yet.
    </p>
    <p className="mt-1 text-sm text-gray-500">
      Waiting for instructor to create tests.
    </p>
  </div>
);

export default EmptyTests; 