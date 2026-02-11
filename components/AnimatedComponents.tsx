"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedStatsProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedStat({ end, label, suffix = "", prefix = "" }: AnimatedStatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {isInView && (
          <CountUp
            start={0}
            end={end}
            duration={2.5}
            separator=","
            suffix={suffix}
            prefix={prefix}
          />
        )}
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-lg">{label}</div>
    </motion.div>
  );
}

export function AnimatedFeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}
