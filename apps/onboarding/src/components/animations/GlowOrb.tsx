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
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
