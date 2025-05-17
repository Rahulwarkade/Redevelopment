import React from "react";

interface RadioProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Radio: React.FC<RadioProps> = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="form-radio text-indigo-600 focus:ring-indigo-500"
      />
      <span className="ml-2 text-sm">{label}</span>
    </label>
  );
};

export default Radio;
