"use client";

import { motion } from "framer-motion";

interface GlowOrbProps {
  color?: "primary" | "blue";
  size?: number;
  className?: string;
}

export default function GlowOrb({
  color = "primary",
  size = 400,
  className = "",
}: GlowOrbProps) {
  const colorMap = {
    primary: "rgba(5, 160, 73, 0.12)",
    blue: "rgba(0, 42, 64, 0.5)",
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        filter: "blur(60px)",
        willChange: "transform, opacity",
      }}
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
