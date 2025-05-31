import React from "react";
import Container from "../Container";

interface RadioToggleProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  labelClassName?: string;
}

const RadioToggle: React.FC<RadioToggleProps> = ({
  label,
  checked,
  onChange,
  labelClassName,
}) => {
  return (
    <Container className="flex items-center gap-2">
      <span className={`text-sm ${labelClassName}`}>{label}</span>
      <Container
        onClick={() => onChange(!checked)}
        className={`relative w-[64px] h-8 flex items-center rounded-full p-1 transition-colors ${
          checked ? "bg-[#116C61]" : "bg-gray-300"
        }`}
      >
        {checked ? <span className="text-[#FFFFFF] text-base font-semibold">On</span> : <span className="text-[#667085] text-base font-semibold absolute right-2">Off</span> }
        <div
          className={`absolute bg-white w-[28px] h-[28px] rounded-full shadow-md transform duration-300 ${
            checked ? "translate-x-8" : "translate-x-0"
          }`}
        />
      </Container>
    </Container>
  );
};

export default RadioToggle;
