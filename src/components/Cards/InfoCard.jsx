import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SCHEMES = {
  purple: {
    gradient: "linear-gradient(135deg, #875cf5 0%, #5b35cc 100%)",
    glow: "rgba(135,92,245,0.45)",
    shimmer: "rgba(255,255,255,0.12)",
  },
  green: {
    gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    glow: "rgba(5,150,105,0.40)",
    shimmer: "rgba(255,255,255,0.10)",
  },
  red: {
    gradient: "linear-gradient(135deg, #e53e6a 0%, #b91c4a 100%)",
    glow: "rgba(229,62,106,0.40)",
    shimmer: "rgba(255,255,255,0.10)",
  },
};

const InfoCard = ({ icon, label, value, colorScheme = "purple" }) => {
  const cardRef = useRef(null);
  const numRef  = useRef(null);
  const prev    = useRef(0);
  const scheme  = SCHEMES[colorScheme] ?? SCHEMES.purple;

  useEffect(() => {
    if (!numRef.current) return;
    const raw = parseFloat(String(value).replace(/,/g, "")) || 0;
    const obj = { val: prev.current };
    gsap.to(obj, {
      val: raw,
      duration: 1.1,
      ease: "power2.out",
      onUpdate() {
        if (numRef.current)
          numRef.current.textContent =
            "₹" + Math.round(obj.val).toLocaleString("en-IN");
      },
    });
    prev.current = raw;
  }, [value]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: x * 14,
      rotateX: -y * 14,
      transformPerspective: 700,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl p-6 cursor-default select-none h-full flex flex-col justify-between"
      style={{
        background: scheme.gradient,
        boxShadow: `0 10px 40px ${scheme.glow}`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Top shimmer stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: scheme.shimmer }}
      />

      {/* Decorative large bg icon */}
      <div
        className="absolute -right-3 -bottom-3 text-[7rem] leading-none pointer-events-none select-none"
        style={{ opacity: 0.12, filter: "blur(1px)" }}
      >
        {icon}
      </div>

      {/* Radial glow spot */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "rgba(255,255,255,0.22)" }}
          >
            <span className="text-white">{icon}</span>
          </div>
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
            {label}
          </p>
        </div>

        <p
          ref={numRef}
          className="text-3xl font-bold tracking-tight text-white"
        >
          ₹0
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
