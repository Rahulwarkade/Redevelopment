import React, { ReactNode, ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  centered?: boolean;
  fluid?: boolean;
  as?: ElementType;
  bgColor?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
  borderColor?: string;
  onClick?: ()=>void;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  maxWidth,
  padding,
  centered = false,
  fluid = false,
  as: Component = "div",
  bgColor = "",
  rounded = "none",
  shadow = "none",
  border = false,
  borderColor,
  ...props
}) => {
  const getMaxWidthClass = () => {
    if (fluid) return "w-full";

    switch (maxWidth) {
      case "xs":
        return "max-w-xs";
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "full":
        return "max-w-full";
      case "none":
        return "";
      default:
        return "w-full";
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case "none":
        return "";
      case "sm":
        return "px-3 py-2";
      case "md":
        return "px-4 py-3";
      case "lg":
        return "px-6 py-4";
      case "xl":
        return "px-8 py-6";
      default:
        return "";
    }
  };

  const getRoundedClass = () => {
    switch (rounded) {
      case "none":
        return "";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "full":
        return "rounded-full";
      default:
        return "";
    }
  };

  const getShadowClass = () => {
    switch (shadow) {
      case "none":
        return "";
      case "sm":
        return "shadow-sm";
      case "md":
        return "shadow";
      case "lg":
        return "shadow-lg";
      case "xl":
        return "shadow-xl";
      default:
        return "";
    }
  };

  const containerClasses = twMerge(
    getMaxWidthClass(),
    getPaddingClass(),
    getRoundedClass(),
    getShadowClass(),
    centered ? "mx-auto" : "",
    bgColor,
    border ? `border ${borderColor}` : "",
    className
  );

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  );
};

export default Container;
