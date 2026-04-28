import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";

const Modal = ({ children, isOpen, onClose, title }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { y: 32, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
        );
      }
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "var(--bg-modal)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-2xl shadow-2xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-strong)",
          boxShadow: "var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h3
            className="text-base font-semibold"
            style={{ color: "var(--text-1)" }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ color: "var(--text-3)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-dim)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-3)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
