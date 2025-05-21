"use client";
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
      {/* Overlay */}
      <section className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/80 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
      {/* Popup Content */}
      <section
        className="relative z-10 bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full transition-all duration-300 opacity-100 scale-100 animate-fadeIn"
        ref={popupRef}
      >
        {children}
      </section>
    </section>
  );
};

export default Popup;
