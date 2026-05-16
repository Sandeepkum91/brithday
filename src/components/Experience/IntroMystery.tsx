"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface IntroMysteryProps {
  onNext: () => void;
}

export const IntroMystery = ({ onNext }: IntroMysteryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-10"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-8"
      >
        <Sparkles className="w-16 h-16 text-white/40 animate-pulse" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-4xl md:text-6xl font-serif mb-12 tracking-wider leading-tight"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="block text-white/90"
        >
          Wait a second...
        </motion.span>
        <span className="text-white/60 text-2xl md:text-3xl mt-4 block">
          someone has a special surprise for Yadav Ji ❤️
        </span>
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="glass-morphism px-10 py-4 rounded-full text-lg font-light tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white/10"
      >
        Tap to Continue
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm tracking-widest uppercase"
      >
        Best experienced with sound
      </motion.div>
    </motion.div>
  );
};
