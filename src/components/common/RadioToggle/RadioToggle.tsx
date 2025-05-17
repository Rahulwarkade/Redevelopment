import React from "react";

interface RadioToggleProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const RadioToggle: React.FC<RadioToggleProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default RadioToggle;
