import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { statisticsData } from '../data/portfolioData';

interface CounterProps {
  value: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!inView) return;

    // Check if the value is float
    const targetVal = parseFloat(value);
    if (isNaN(targetVal)) return;

    const isFloat = value.includes('.');
    const decimals = isFloat ? value.split('.')[1].length : 0;

    const controls = animate(0, targetVal, {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1.0],
      onUpdate: (val) => {
        setDisplayValue(val.toFixed(decimals));
      }
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight">
      {displayValue}
      {suffix && <span className="text-primary font-bold text-3xl sm:text-5xl ml-1">{suffix}</span>}
    </span>
  );
};

const Statistics: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-6 bg-transparent relative border-y border-gray-200/50 dark:border-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
          {statisticsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-4"
            >
              {/* Animated value count */}
              <Counter value={stat.value} suffix={stat.suffix} />
              
              {/* Stat Name */}
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-3">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
