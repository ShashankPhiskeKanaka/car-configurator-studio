import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function StepLayout({ title, subtitle, children }: StepLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl md:text-3xl font-bold"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-1"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </motion.div>
  );
}
