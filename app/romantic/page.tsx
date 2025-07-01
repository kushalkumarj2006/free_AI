"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

export default function RomanticPage() {
  const [showMessage, setShowMessage] = useState(false);

  // Generate floating hearts with random positions and animation durations
  const hearts = useMemo(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      size: 20 + Math.random() * 30,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  , []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-100 to-red-50 p-4">
      {/* Floating hearts background */}
      {hearts.map((h, idx) => (
        <motion.span
          key={idx}
          className="absolute select-none text-rose-300"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -800, opacity: [0, 0.3, 0] }}
          transition={{
            repeat: Infinity,
            duration: h.duration,
            delay: h.delay,
            ease: "easeInOut",
          }}
        >
          ❤
        </motion.span>
      ))}

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-lg rounded-3xl bg-white/50 p-8 text-center shadow-xl backdrop-blur-sm"
      >
        <h1 className="mb-4 font-serif text-4xl font-bold text-rose-600 sm:text-6xl">
          To My Dearest Love
        </h1>
        <p className="mb-8 text-lg text-rose-700 sm:text-xl">
          I made this little page just for you.
        </p>
        <button
          onClick={() => setShowMessage(true)}
          className="rounded-full bg-rose-600 px-6 py-3 font-medium text-rose-50 shadow-lg transition-all hover:bg-rose-700 hover:shadow-2xl"
        >
          Click to reveal my heart
        </button>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8 rounded-2xl bg-white/70 p-6 text-left text-rose-800 shadow-sm backdrop-blur-md"
            >
              <p className="text-base sm:text-lg">
                There are a million ways to say <span className="font-semibold">I love you</span>,
                but none quite capture the way my heart races whenever I think of you.
                You are the sunrise to my mornings and the starlight to my nights.
                Thank you for painting my world with your colors.
              </p>
              <p className="mt-4 text-right text-xl font-bold">❤ Yours forever</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}