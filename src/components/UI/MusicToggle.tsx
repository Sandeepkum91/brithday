"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicToggleProps {
  isCelebration?: boolean;
  isBirthday?: boolean;
}

export const MusicToggle = ({ isCelebration, isBirthday }: MusicToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const softTrack = "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3";
  const celebratoryTrack = "https://cdn.pixabay.com/audio/2024/02/09/audio_27732a3f01.mp3"; 
  const birthdayTrack = "https://cdn.pixabay.com/audio/2021/11/24/audio_8346e96a8e.mp3"; // Happy Birthday Song

  useEffect(() => {
    let targetSrc = softTrack;
    if (isBirthday) {
      targetSrc = birthdayTrack;
    } else if (isCelebration) {
      targetSrc = celebratoryTrack;
    }
    
    if (!audioRef.current) {
      const audio = new Audio(targetSrc);
      audio.loop = true;
      audio.volume = 0.5;
      
      // Sync state with audio events to avoid cascading renders
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      
      audioRef.current = audio;
    } else if (audioRef.current.src !== new URL(targetSrc, window.location.href).href) {
      const wasPlaying = !audioRef.current.paused || isBirthday;
      audioRef.current.pause();
      audioRef.current.src = targetSrc;
      if (wasPlaying) {
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
      }
    }
  }, [isCelebration, isBirthday, celebratoryTrack, softTrack, birthdayTrack]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    } else {
      audioRef.current.pause();
    }
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
