import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CountUp = ({ value, prefix = "", suffix = "", className = "", style = {} }) => {
  const ref  = useRef(null);
  const prev = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    const target = parseFloat(String(value).replace(/,/g, "")) || 0;
    const obj = { val: prev.current };
    gsap.to(obj, {
      val: target,
      duration: 1.1,
      ease: "power2.out",
      onUpdate() {
        if (ref.current)
          ref.current.textContent =
            prefix + Math.round(obj.val).toLocaleString("en-IN") + suffix;
      },
    });
    prev.current = target;
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
};

export default CountUp;
