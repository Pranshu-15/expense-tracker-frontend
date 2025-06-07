import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ children, isOpen, onClose, title }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 bg-opacity-50 transition-opacity duration-200"
        onClick={handleBackdropClick}
      >
        {/* Modal container */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal content */}
          <div
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-200 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
