"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface NameRevealProps {
  onNext: () => void;
  name: string;
}

export const NameReveal = ({ onNext, name }: NameRevealProps) => {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const [balloons, setBalloons] = useState<{ x: number; rotate: number; duration: number; hue: number }[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBalloons([...Array(15)].map(() => ({
        x: Math.random() * 100,
        rotate: Math.random() * 20 - 10,
        duration: 8 + Math.random() * 10,
        hue: Math.random() * 360
      })));
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative overflow-hidden"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10"
      >
        <motion.h2
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl md:text-6xl lg:text-8xl font-serif mb-6 text-glow"
        >
          Happy Birthday
        </motion.h2>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="text-5xl md:text-7xl lg:text-9xl font-handwriting text-gold gold-glow mb-4 px-4 break-words"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
          className="text-lg md:text-2xl font-light tracking-[0.3em] uppercase mb-12"
        >
          It&apos;s your special day!
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="glass-morphism px-8 py-4 md:px-12 md:py-5 rounded-full text-lg md:text-xl font-light tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white/10"
        >
          Open Your Surprise
        </motion.button>
      </motion.div>

      {/* Floating Balloons Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {balloons.map((balloon, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%", x: `${balloon.x}%`, opacity: 0 }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 1, 1, 0],
              rotate: [0, balloon.rotate, 0]
            }}
            transition={{
              duration: balloon.duration,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-12 h-16 rounded-[50%_50%_50%_50%/_40%_40%_60%_60%] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-[2px]"
            style={{
              filter: `hue-rotate(${balloon.hue}deg)`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
