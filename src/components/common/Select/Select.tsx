import React from "react";

interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  className? : string,
  labelClassName? : string
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, labelClassName, className }) => {
  return (
    <div className="flex flex-col">
      <label className={`text-sm font-medium  mb-1 ${labelClassName}`}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
