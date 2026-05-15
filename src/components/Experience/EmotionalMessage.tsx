"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface EmotionalMessageProps {
  onNext: () => void;
  message: string;
}

export const EmotionalMessage = ({ onNext, message }: EmotionalMessageProps) => {
  const [hearts, setHearts] = React.useState<{ x: number; xOffset: number; duration: number; size: number }[]>([]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setHearts([...Array(10)].map(() => ({
        x: Math.random() * 100,
        xOffset: Math.random() * 100 - 50,
        duration: 5 + Math.random() * 5,
        size: Math.random() * 20 + 10
      })));
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 md:px-24 relative"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl glass-morphism p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <motion.div variants={item} className="mb-8 flex justify-center">
          <Heart className="text-red-400/50 fill-red-400/20 w-12 h-12 animate-pulse" />
        </motion.div>

        <motion.p
          variants={item}
          className="text-2xl md:text-4xl font-handwriting leading-relaxed text-white/90 italic mb-12"
        >
          {message}
        </motion.p>

        <motion.div variants={item}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="text-white/40 hover:text-white transition-colors tracking-[0.3em] uppercase text-sm font-light mt-4"
          >
            See Memories
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, x: heart.x + "%" }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -100,
              x: heart.xOffset + "%" 
            }}
            transition={{
              duration: heart.duration,
              delay: i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute"
          >
            <Heart size={heart.size} className="text-white/10" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
