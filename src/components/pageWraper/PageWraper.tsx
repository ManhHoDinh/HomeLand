import React from "react";
import { motion } from "framer-motion";
export default function PageWraper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{duration: 0.6}}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
}
