"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { twMerge } from "tailwind-merge";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "landscape";
  containerClassName?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  onError?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/placeholder.png",
  objectFit = "cover",
  rounded = "none",
  aspectRatio = "auto",
  className = "",
  containerClassName = "",
  priority = false,
  quality = 75,
  fill = false,
  sizes = "100vw",
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
    onError?.();
  };

  const getObjectFitClass = () => {
    switch (objectFit) {
      case "contain":
        return "object-contain";
      case "cover":
        return "object-cover";
      case "fill":
        return "object-fill";
      case "none":
        return "object-none";
      case "scale-down":
        return "object-scale-down";
      default:
        return "object-cover";
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
      case "full":
        return "rounded-full";
      default:
        return "";
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "portrait":
        return "aspect-[3/4]";
      case "landscape":
        return "aspect-[4/3]";
      default:
        return "";
    }
  };

  const imageClasses = twMerge(
    getObjectFitClass(),
    getRoundedClass(),
    className
  );

  const containerClasses = twMerge(
    "relative overflow-hidden",
    getAspectRatioClass(),
    getRoundedClass(),
    !fill && width && height ? "" : "w-full h-full",
    containerClassName
  );

  return (
    <div className={containerClasses}>
      <NextImage
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={imageClasses}
        onError={handleError}
        priority={priority}
        quality={quality}
        fill={fill}
        sizes={sizes}
        {...props}
      />
    </div>
  );
};

export default Image;
