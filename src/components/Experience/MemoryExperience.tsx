"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const memories = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop",
    caption: "The day we first met and laughed until our stomachs hurt...",
    color: "#ff9a9e"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1000&auto=format&fit=crop",
    caption: "That sunset that felt like it would never end...",
    color: "#fad0c4"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000&auto=format&fit=crop",
    caption: "Every small moment with you is a big treasure for me.",
    color: "#a1c4fd"
  }
];

interface MemoryExperienceProps {
  onNext: () => void;
}

export const MemoryExperience = ({ onNext }: MemoryExperienceProps) => {
  const [index, setIndex] = useState(0);

  const nextMemory = () => {
    if (index < memories.length - 1) {
      setIndex(index + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center"
      >
        <h3 className="text-sm tracking-[0.4em] uppercase text-white/40 mb-2">Our Journey</h3>
        <h2 className="text-3xl md:text-5xl font-serif">Some Beautiful Memories</h2>
      </motion.div>

      <div className="relative w-full max-w-[500px] h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotate: -10, x: 100 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10, x: -100 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0 p-6 bg-white rounded-xl shadow-2xl preserve-3d"
          >
            <div className="w-full h-[80%] overflow-hidden rounded-lg mb-6 bg-gray-100">
              <img 
                src={memories[index].image} 
                alt="Memory" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="text-center font-handwriting text-gray-800 text-xl md:text-2xl px-2">
              {memories[index].caption}
            </div>
            
            {/* Polaroid shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        className="mt-12 flex items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex gap-2">
          {memories.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-white" : "bg-white/20"}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMemory}
          className="glass-morphism p-4 rounded-full flex items-center justify-center"
        >
          {index === memories.length - 1 ? (
            <span className="px-4 text-sm tracking-widest uppercase">One More Surprise</span>
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
