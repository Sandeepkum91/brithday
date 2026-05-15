"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3"); // Soft cinematic piano
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-8 z-[1000] glass-morphism p-4 rounded-full text-white/80 hover:text-white transition-colors"
      onClick={toggleMusic}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Volume2 size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <VolumeX size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
