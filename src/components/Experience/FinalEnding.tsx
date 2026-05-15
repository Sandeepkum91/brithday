"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const FinalEnding = () => {
  const [sparkles, setSparkles] = React.useState<{ x: number; y: number; duration: number; delay: number }[]>([]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSparkles([...Array(30)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5
      })));
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-8 flex justify-center"
        >
          <Heart className="w-20 h-20 text-red-500 fill-red-500/20 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
          Thank you for being <br />
          <span className="text-gold gold-glow">part of my life ❤️</span>
        </h2>
        
        <p className="text-white/60 text-lg md:text-xl font-light tracking-widest uppercase max-w-xl mx-auto leading-relaxed">
          I hope this small surprise brought a big smile to your beautiful face.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-20"
        >
          <button 
            onClick={() => window.location.reload()}
            className="text-white/20 hover:text-white transition-all duration-500 text-sm tracking-[0.4em] uppercase"
          >
            Relive the Magic
          </button>
        </motion.div>
      </motion.div>

      {/* Final background magic */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              scale: [0, 1.5, 0],
              x: sparkle.x + "%",
              y: sparkle.y + "%"
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-4 h-4 bg-white/10 rounded-full blur-xl"
          />
        ))}
      </div>
    </motion.div>
  );
};
