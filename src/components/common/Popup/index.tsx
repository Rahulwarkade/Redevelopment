"use client";
import React from "react";

interface PopupProps {
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ children }) => {
  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/80 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
      {/* Content */}
      <div className="relative z-10  w-full h-full transition-all duration-300 opacity-100 scale-100 animate-fadeIn flex justify-center items-center">
        {children}
      </div>
    </section>
  );
};

export default Popup;

/**
 * "use client";
import React, { useEffect, useRef } from "react";

interface PopupProps {
  children: React.ReactNode;
  setShowAddBanner: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<PopupProps> = ({ children, setShowAddBanner }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = () => {
      setShowAddBanner(false);
    };
    const handlePopupClick = (event: MouseEvent) => {
      event?.stopPropagation();
    };
    const currentPopRef = popupRef.current;

    document.addEventListener("click", handleClick);

    if (currentPopRef) {
      currentPopRef.addEventListener("click", handlePopupClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);

      if (currentPopRef) {
        currentPopRef.removeEventListener("click", handlePopupClick);
      }
    };
  }, []);
  return (
    <section className="fixed inset-0 flex justify-center items-center z-50">

      <section className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/80 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
      <section
        className="relative z-10  w-full h-full transition-all duration-300 opacity-100 scale-100 animate-fadeIn flex justify-center items-center"
        ref={popupRef}
      >
        {children}
      </section>
    </section>
  );
};

export default Popup;

 * 
 */