import React, { useRef, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { gsap } from "gsap";

const PURPLE_SHADES = ["#875cf5", "#a07cf8", "#c4a8fb", "#6e47e0", "#9d78f7"];
const GREEN_SHADES  = ["#059669", "#10b981", "#34d399", "#047857", "#6ee7b7"];
const RED_SHADES    = ["#e53e6a", "#f87171", "#fca5a5", "#b91c4a", "#fb7185"];

function getShades(color) {
  if (!color) return PURPLE_SHADES;
  const c = color.toLowerCase();
  if (c.includes("059669") || c.includes("047857") || c === "green") return GREEN_SHADES;
  if (c.includes("e53e6a") || c.includes("b91c4a") || c === "red")   return RED_SHADES;
  return PURPLE_SHADES;
}

const CustomBarChart = ({ data, color }) => {
  const shades     = getShades(color);
  const wrapperRef = useRef(null);
  const animated   = useRef(false);

  useEffect(() => {
    if (!data?.length || animated.current || !wrapperRef.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      /* Container slides up and fades in */
      gsap.fromTo(wrapperRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", clearProps: "all" }
      );

      /* Individual bar columns stagger in via clip-path grow-up */
      gsap.fromTo(".recharts-bar-rectangle",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, stagger: 0.06, duration: 0.55, ease: "back.out(1.2)", delay: 0.15, clearProps: "all" }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [data]);

  const TooltipContent = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;
    return (
      <div
        className="rounded-xl px-3 py-2 text-xs shadow-lg"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-1)",
        }}
      >
        <p className="font-semibold mb-1" style={{ color: shades[0] }}>
          {item.source || item.category || item.month}
        </p>
        <p style={{ color: "var(--text-2)" }}>
          Amount:{" "}
          <span className="font-bold" style={{ color: "var(--text-1)" }}>
            ₹{item.amount?.toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div ref={wrapperRef} className="mt-4" style={{ borderRadius: 12 }}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "var(--text-3)" }}
            stroke="transparent"
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--text-3)" }}
            stroke="transparent"
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            content={<TooltipContent />}
            cursor={{ fill: "var(--accent-dim)", radius: 6 }}
          />
          <Bar
            dataKey="amount"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationBegin={180}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={shades[index % shades.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
