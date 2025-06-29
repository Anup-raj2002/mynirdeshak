import React from "react";
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  isVisible,
  onToggle,
  ...props
}) {
  return (
    <div className="relative mb-4 sm:mb-6">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200"
          {...props}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
