import React, { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "outlined" | "filled";
  inputSize?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      containerClassName = "",
      labelClassName = "",
      errorClassName = "",
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize ,
      disabled,
      type="text",
      ...props
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "outlined":
          return "border border-gray-300 bg-transparent focus:border-blue-500";
        case "filled":
          return "border border-transparent bg-gray-100 focus:bg-transparent focus:border-blue-500";
        default:
          return "";
      }
    };

    const getSizeClasses = () => {
      switch (inputSize) {
        case "sm":
          return "px-2 py-1 text-sm";
        case "lg":
          return "px-4 py-3 text-lg";
        default:
          return "px-3 py-2 text-base";
      }
    };

    const inputClasses = twMerge(
      "w-full transition-colors",
      getVariantClasses(),
      getSizeClasses(),
      leftIcon ? "pl-10" : "",
      rightIcon ? "pr-10" : "",
      disabled ? "opacity-60 cursor-not-allowed" : "",
      error ? "border-red-500 focus:border-red-500" : "",
      className
    );

    return (
      <div className={`${containerClassName}`}>
        {label && (
          <label
            className={twMerge(
              "text-sm font-medium text-gray-700",
              disabled ? "opacity-60" : "",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="w-full relative">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            type={type}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className={twMerge("text-sm text-red-500", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
