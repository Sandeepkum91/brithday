"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift } from "lucide-react";

interface GiftBoxProps {
  onNext: () => void;
  onOpen?: () => void;
}

export const GiftBox = ({ onNext, onOpen }: GiftBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onOpen?.();
    
    // Fireworks effect
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000
    };

    function fire(particleRatio: number, opts: { spread?: number; startVelocity?: number; decay?: number; scalar?: number }) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    setTimeout(() => {
      onNext();
    }, 4000);
  };

  const [particles, setParticles] = useState<{ x: number; y: number; delay: number }[]>([]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setParticles([...Array(50)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5
      })));
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden relative"
    >
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            key="gift-box"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative cursor-pointer group"
            onClick={handleOpen}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 h-48 md:w-64 md:h-64 bg-gold rounded-2xl relative shadow-[0_0_50px_rgba(212,175,55,0.3)] flex items-center justify-center"
            >
              {/* Box Lid/Ribbon */}
              <div className="absolute top-1/2 left-0 w-full h-4 bg-white/30 -translate-y-1/2" />
              <div className="absolute top-0 left-1/2 w-4 h-full bg-white/30 -translate-x-1/2" />
              
              <Gift className="w-20 h-20 text-white animate-pulse" />
              
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-gold rounded-full border-4 border-white/20 flex items-center justify-center">
                <div className="w-16 h-4 bg-white/40 rounded-full rotate-45 absolute" />
                <div className="w-16 h-4 bg-white/40 rounded-full -rotate-45 absolute" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center text-white/40 tracking-[0.3em] uppercase text-sm"
            >
              Click to Unbox
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10"
          >
            <motion.h2
              animate={{ 
                scale: [1, 1.2, 1],
                textShadow: ["0 0 0px #fff", "0 0 20px #fff", "0 0 0px #fff"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl md:text-5xl lg:text-7xl font-serif mb-6 px-4"
            >
              Wait... There&apos;s More!
            </motion.h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white/60 font-light px-4">The magic is just beginning...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glowing particles during unboxing */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ x: "50%", y: "50%", opacity: 1 }}
              animate={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                opacity: 0,
                scale: 0
              }}
              transition={{ duration: 2, delay: particle.delay }}
              className="absolute w-2 h-2 bg-gold rounded-full blur-sm"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
