"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CakeInteractionProps {
  onNext: () => void;
}

export const CakeInteraction = ({ onNext }: CakeInteractionProps) => {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onNext();
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-serif mb-4">Happy Birthday, <span className="text-gold">Dolly!</span></h2>
        <p className="text-white/40 tracking-widest uppercase text-sm">Close your eyes, make a wish, and blow the candle...</p>
      </motion.div>

      <div className="relative cursor-pointer" onClick={handleBlow}>
        {/* Cake Base */}
        <motion.div
          animate={{ scale: isBlown ? [1, 1.05, 1] : 1 }}
          className="relative"
        >
          {/* Top Layer */}
          <div className="w-48 h-24 md:w-64 md:h-32 bg-pink-200/20 backdrop-blur-md border border-white/20 rounded-t-[50px] relative z-10">
            <div className="absolute -bottom-2 left-0 w-full h-8 bg-pink-300/30 rounded-full blur-sm" />
          </div>
          {/* Bottom Layer */}
          <div className="w-56 h-28 md:w-72 md:h-36 bg-pink-300/10 backdrop-blur-md border border-white/10 rounded-t-[60px] -mt-12 relative z-0">
            <div className="absolute -bottom-4 left-0 w-full h-12 bg-pink-400/20 rounded-full blur-md" />
          </div>

          {/* Candle */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4 h-20 bg-white/80 rounded-full z-20 overflow-hidden">
            <div className="w-full h-1/2 bg-gradient-to-b from-blue-400 to-transparent opacity-30" />
            
            {/* Flame */}
            <AnimatePresence>
              {!isBlown && (
                <motion.div
                  key="flame"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1.1, 1.3, 1],
                    y: [0, -2, 0, -3, 0],
                    opacity: 1
                  }}
                  exit={{ scale: 0, opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ 
                    scale: { duration: 0.5, repeat: Infinity },
                    y: { duration: 0.8, repeat: Infinity }
                  }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-12 bg-orange-500 rounded-[50%_50%_50%_50%/_60%_60%_40%_40%] blur-[2px] shadow-[0_0_20px_#f97316]"
                >
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-300 rounded-full blur-[1px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Smoke after blowing */}
        {isBlown && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.5, 0], y: -100, x: [0, 20, -20, 0] }}
            transition={{ duration: 3 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 h-20 bg-white/20 blur-xl rounded-full"
          />
        )}
      </div>

      <AnimatePresence>
        {isBlown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <motion.h3 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl md:text-3xl font-handwriting text-gold gold-glow"
            >
              Your wish is being sent to the stars...
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
