"use client";

import React from "react";
import { motion } from "motion/react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 20,
  x = 0,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
