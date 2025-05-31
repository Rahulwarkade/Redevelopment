import React from "react";

interface RadioProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({ label, checked, onChange, className}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="form-radio text-indigo-600 focus:ring-indigo-500"
      />
      <span className={`ml-2 text-sm ${className}`}>{label}</span>
    </label>
  );
};

export default Radio;
