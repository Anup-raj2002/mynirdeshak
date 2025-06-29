import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ label, id, ...props }) => {
  return (
    <div className="mb-4 sm:mb-6">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200"
        {...props}
      />
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default TextInput;
