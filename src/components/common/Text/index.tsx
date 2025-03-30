import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";
  className?: string;
  color?: string;
  weight?: "normal" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  align?: "left" | "center" | "right";
  truncate?: boolean;
  onClick?: () => void;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "p",
  className = "",
  color,
  weight = "normal",
  size,
  align = "left",
  truncate = false,
  onClick,
  ...props
}) => {
  const getDefaultSize = () => {
    switch (variant) {
      case "h1":
        return "4xl";
      case "h2":
        return "3xl";
      case "h3":
        return "2xl";
      case "h4":
        return "xl";
      case "h5":
        return "lg";
      case "h6":
        return "base";
      default:
        return "base";
    }
  };

  const getWeightClass = () => {
    switch (weight) {
      case "normal":
        return "font-normal";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
      default:
        return "font-normal";
    }
  };

  const getSizeClass = () => {
    const defaultSize = getDefaultSize();
    const selectedSize = size || defaultSize;

    switch (selectedSize) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl";
      default:
        return "text-base";
    }
  };

  const getAlignClass = () => {
    switch (align) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const classes = twMerge(
    color,
    getWeightClass(),
    getSizeClass(),
    getAlignClass(),
    truncate ? "truncate" : "",
    className
  );

  const Component = variant;

  return (
    <Component className={classes} onClick={onClick} {...props}>
      {children}
    </Component>
  );
};

export default Text;
