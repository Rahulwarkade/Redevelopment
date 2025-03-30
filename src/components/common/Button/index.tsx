import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant ,
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  rounded ,
  className = "",
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white border border-transparent";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800 border border-transparent";
      case "outline":
        return "bg-transparent hover:bg-gray-50 text-blue-600 border border-blue-600";
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent";
      case "link":
        return "bg-transparent hover:underline text-blue-600 border-none shadow-none";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white border border-transparent";
      default:
        return "";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "px-2 py-1 text-xs";
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-base";
      case "lg":
        return "px-5 py-2.5 text-lg";
      case "xl":
        return "px-6 py-3 text-xl";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const getRoundedClasses = () => {
    switch (rounded) {
      case "none":
        return "rounded-none";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "full":
        return "rounded-full";
      default:
        return "rounded-md";
    }
  };

  const buttonClasses = twMerge(
    "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center",
    getVariantClasses(),
    getSizeClasses(),
    getRoundedClasses(),
    fullWidth ? "w-full" : "",
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "",
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
