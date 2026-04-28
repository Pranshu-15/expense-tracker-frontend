import React, { useEffect, useRef } from "react";
import { LuTrendingUpDown, LuSun, LuMoon } from "react-icons/lu";
import { gsap } from "gsap";
import { useTheme } from "../../context/ThemeContext";

const AuthLayout = ({ children }) => {
  const decoRef = useRef(null);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    if (!decoRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".deco-orb",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.18, duration: 0.9, ease: "back.out(1.5)", clearProps: "transform" }
      );
      gsap.fromTo(
        ".deco-card",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2,
          onComplete() {
            gsap.to(".deco-card", {
              y: -10, repeat: -1, yoyo: true, duration: 3.5, ease: "sine.inOut",
            });
          },
        }
      );
    }, decoRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-base)" }}>

      {/* ── Left: form panel ─────────────────────────────────────── */}
      <div className="w-full md:w-[58%] flex flex-col min-h-screen">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-7 pb-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg"
              style={{ background: "var(--accent)" }}
            >
              ET
            </div>
            <span className="font-semibold text-sm" style={{ color: "var(--text-1)" }}>
              Expense Tracker
            </span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid var(--border)",
              color: isDark ? "#f5c518" : "var(--accent)",
            }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <LuSun size={16} /> : <LuMoon size={16} />}
          </button>
        </div>

        {/* Form centred vertically */}
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div
            className="w-full max-w-[400px] rounded-2xl p-8"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* ── Right: decorative panel ───────────────────────────────── */}
      <div
        ref={decoRef}
        className="hidden md:flex md:w-[42%] relative overflow-hidden flex-col items-center justify-center p-12"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #0e0e20 0%, #13132a 100%)"
            : "linear-gradient(145deg, #f0eeff 0%, #e8e0ff 100%)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {/* Glow orbs */}
        <div
          className="deco-orb absolute w-80 h-80 rounded-full pointer-events-none"
          style={{
            top: "-80px",
            right: "-80px",
            background: "var(--accent)",
            opacity: 0.15,
            filter: "blur(80px)",
          }}
        />
        <div
          className="deco-orb absolute w-60 h-60 rounded-full pointer-events-none"
          style={{
            bottom: "40px",
            left: "-60px",
            background: "#4f39f6",
            opacity: 0.13,
            filter: "blur(70px)",
          }}
        />
        <div
          className="deco-orb absolute w-44 h-44 rounded-full pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "var(--accent)",
            opacity: 0.08,
            filter: "blur(60px)",
          }}
        />

        {/* 3-D floating stats card */}
        <div
          className="deco-card relative z-10 w-full max-w-[300px]"
          style={{ perspective: "800px" }}
        >
          <div
            className="rounded-2xl p-6"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              boxShadow: "var(--shadow-lg)",
              transform: "rotateY(-10deg) rotateX(5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
                style={{ background: "var(--accent)", boxShadow: "0 4px 16px var(--accent-glow)" }}
              >
                <LuTrendingUpDown />
              </div>
              <div>
                <p className="text-[11px]" style={{ color: "var(--text-3)" }}>
                  Total Tracked
                </p>
                <p className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>
                  ₹4,30,000
                </p>
              </div>
            </div>

            <div className="h-px w-full mb-4" style={{ background: "var(--border)" }} />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Income",   value: "₹2,80,000", color: "var(--green)" },
                { label: "Expenses", value: "₹1,50,000", color: "var(--red)"   },
                { label: "Savings",  value: "₹1,30,000", color: "var(--accent)"},
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="rounded-xl p-2.5"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <p className="text-[10px] mb-1" style={{ color: "var(--text-3)" }}>
                    {label}
                  </p>
                  <p className="text-xs font-bold" style={{ color }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating pill */}
          <div
            className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white shadow-lg whitespace-nowrap"
            style={{
              background: "var(--green)",
              boxShadow: "0 4px 16px rgba(32,223,168,0.4)",
            }}
          >
            ↑ +₹28,500 this month
          </div>
        </div>

        {/* Caption */}
        <div className="relative z-10 text-center mt-16">
          <p className="text-lg font-semibold" style={{ color: "var(--text-1)" }}>
            Take control of your finances
          </p>
          <p className="text-sm mt-1.5" style={{ color: "var(--text-3)" }}>
            Track income &amp; expenses. Visualise your patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
