import React, { useRef, useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { gsap } from "gsap";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  const wrapperRef = useRef(null);
  const labelRef   = useRef(null);
  const animated   = useRef(false);

  useEffect(() => {
    if (!data?.length || animated.current || !wrapperRef.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      /* Whole chart scales + fades in */
      gsap.fromTo(wrapperRef.current,
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.75, ease: "back.out(1.5)", clearProps: "all" }
      );

      /* Centre label counts up */
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.45, clearProps: "all" }
        );
      }

      /* Legend items stagger in */
      gsap.fromTo(".recharts-legend-item",
        { x: -12, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out", delay: 0.5, clearProps: "all" }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <div ref={wrapperRef} className="w-full">
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="46%"
            outerRadius={120}
            innerRadius={88}
            labelLine={false}
            strokeWidth={2}
            stroke="var(--bg-card)"
            isAnimationActive={true}
            animationBegin={120}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} verticalAlign="bottom" height={50} />
          {showTextAnchor && label && totalAmount && (
            <g ref={labelRef}>
              <text
                x="50%"
                y="41%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fill: "var(--text-3)", fontSize: "13px" }}
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fill: "var(--text-1)", fontSize: "22px", fontWeight: "700" }}
              >
                {totalAmount}
              </text>
            </g>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
