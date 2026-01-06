import useClickOutside from "@/hooks/useClickOutside";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  if (!isOpen) return null;

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-lg p-6 shadow-lg">
        <div className="mt-4" ref={modalRef}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
