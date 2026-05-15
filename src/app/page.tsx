"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IntroMystery } from "@/components/Experience/IntroMystery";
import { NameReveal } from "@/components/Experience/NameReveal";
import { EmotionalMessage } from "@/components/Experience/EmotionalMessage";
import { MemoryExperience } from "@/components/Experience/MemoryExperience";
import { GiftBox } from "@/components/Experience/GiftBox";
import { CakeInteraction } from "@/components/Experience/CakeInteraction";
import { FinalEnding } from "@/components/Experience/FinalEnding";
import { CustomCursor } from "@/components/UI/CustomCursor";
import { Particles } from "@/components/UI/Particles";
import { MusicToggle } from "@/components/UI/MusicToggle";

export default function BirthdaySurprise() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCelebratoryMusic, setIsCelebratoryMusic] = useState(false);

  // You can customize these
  const birthdayName = "Priya";
  const emotionalMessage = "You are one of the most special people in my life. Every moment shared with you is a gift that I cherish deeply. Happy Birthday, and here's to many more magical years together!";

  useEffect(() => {
    // Simulate loading premium assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <CustomCursor />
      <Particles />
      <MusicToggle isCelebration={isCelebratoryMusic} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/20 tracking-[1em] uppercase text-xs mb-8"
            >
              Preparing the Magic
            </motion.div>
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </motion.div>
        ) : (
          <div className="relative z-10">
            {step === 0 && <IntroMystery key="step0" onNext={nextStep} />}
            {step === 1 && <NameReveal key="step1" name={birthdayName} onNext={nextStep} />}
            {step === 2 && <EmotionalMessage key="step2" message={emotionalMessage} onNext={nextStep} />}
            {step === 3 && <MemoryExperience key="step3" onNext={nextStep} />}
            {step === 4 && <GiftBox key="step4" onNext={nextStep} onOpen={() => setIsCelebratoryMusic(true)} />}
            {step === 5 && <CakeInteraction key="step5" onNext={nextStep} />}
            {step === 6 && <FinalEnding key="step6" />}
          </div>
        )}
      </AnimatePresence>

      {/* Global Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
