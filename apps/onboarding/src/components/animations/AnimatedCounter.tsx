"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);
  const [display, setDisplay] = useState(value);

  const parsed = useMemo(() => {
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) return null;
    return {
      target: parseFloat(match[1]),
      suffix: match[2],
      isDecimal: match[1].includes("."),
    };
  }, [value]);

  useEffect(() => {
    if (!isInView || !parsed || hasAnimated.current) return;
    hasAnimated.current = true;

    const { target, suffix, isDecimal } = parsed;
    const duration = 1500;
    const totalSteps = 40;
    const stepTime = duration / totalSteps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplay(
        `${isDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`
      );

      if (step >= totalSteps) {
        clearInterval(interval);
        setDisplay(value);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isInView, parsed, value]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {display}
    </motion.span>
  );
}
