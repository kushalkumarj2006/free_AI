'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Sparkles, Music, Camera, MessageCircle, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface FloatingHeartProps {
  delay?: number
}

const FloatingHeart: React.FC<FloatingHeartProps> = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, rotate: 0 }}
      animate={{ 
        y: -100, 
        opacity: [0, 1, 1, 0],
        rotate: [0, 10, -10, 0],
        x: [0, 20, -20, 0]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3
      }}
      className="absolute text-pink-400 text-2xl pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        zIndex: 1
      }}
    >
      ❤️
    </motion.div>
  )
}

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-200 opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}

interface LoveMessageProps {
  message: string
  delay?: number
}

const LoveMessage: React.FC<LoveMessageProps> = ({ message, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 p-6 rounded-2xl border border-pink-200 dark:border-pink-800 shadow-lg backdrop-blur-sm"
    >
      <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed font-medium">
        {message}
      </p>
    </motion.div>
  )
}

interface PhotoCardProps {
  src?: string
  alt: string
  delay?: number
}

const PhotoCard: React.FC<PhotoCardProps> = ({ src, alt, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ 
        delay, 
        duration: 0.8,
        hover: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
    >
      <div className="bg-gradient-to-br from-pink-200 to-rose-300 dark:from-pink-800 to-rose-900 p-4 rounded-2xl shadow-xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
            <Camera className="w-16 h-16 text-pink-400" />
            <span className="ml-2 text-pink-600 dark:text-pink-300 font-medium">
              {alt}
            </span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-pink-500/20 rounded-2xl flex items-center justify-center"
      >
        <Heart className="w-8 h-8 text-white" />
      </motion.div>
    </motion.div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`mb-20 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function RomanticApp() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showSurprise, setShowSurprise] = useState(false)

  const loveMessages = [
    "Every moment with you feels like a beautiful dream that I never want to wake up from ✨",
    "You are the melody that makes my heart sing and the rhythm that guides my soul 🎵",
    "In your eyes, I found my home, my peace, and my forever ❤️",
    "You turn ordinary days into extraordinary adventures just by being yourself 🌟",
    "With you, I've learned that love isn't just a feeling—it's a beautiful way of being 💕"
  ]

  const memories = [
    { alt: "Our First Date", delay: 0.2 },
    { alt: "Beach Sunset", delay: 0.4 },
    { alt: "Mountain Adventure", delay: 0.6 },
    { alt: "Cozy Evening", delay: 0.8 },
    { alt: "Dancing Together", delay: 1.0 },
    { alt: "Future Dreams", delay: 1.2 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loveMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [loveMessages.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-purple-900/20 relative overflow-hidden">
      <StarryBackground />
      
      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <Section>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              className="inline-block mb-6"
            >
              <div className="text-8xl mb-4">💖</div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-6"
            >
              My Darling
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light"
            >
              A love letter written in code ✨
            </motion.p>
          </div>
        </Section>

        {/* Rotating Love Messages */}
        <Section>
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              Words from My Heart
            </h2>
            <div className="relative h-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: -90 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <LoveMessage message={loveMessages[currentMessageIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Section>

        {/* Interactive Love Button */}
        <Section>
          <div className="text-center mb-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setShowSurprise(!showSurprise)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-12 py-6 text-xl rounded-full shadow-2xl transition-all duration-300"
              >
                <Heart className="w-6 h-6 mr-3" />
                Click for a Surprise
                <Sparkles className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
            
            <AnimatePresence>
              {showSurprise && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotateZ: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                  exit={{ opacity: 0, scale: 0, rotateZ: -180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mt-8 p-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl border border-purple-200 dark:border-purple-700"
                >
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="text-2xl text-purple-700 dark:text-purple-300 font-medium">
                    Every day with you is a gift! 🎉
                  </p>
                  <p className="text-lg text-purple-600 dark:text-purple-400 mt-4">
                    You make life more beautiful just by being in it ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>

        {/* Memory Gallery */}
        <Section>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              Our Beautiful Memories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memories.map((memory, index) => (
                <PhotoCard
                  key={index}
                  alt={memory.alt}
                  delay={memory.delay}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Features Section */}
        <Section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
              Why You're Amazing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Heart, title: "Your Beautiful Soul", desc: "Your kindness lights up every room" },
                { icon: Star, title: "Your Brilliant Mind", desc: "Your thoughts inspire and amaze me" },
                { icon: Music, title: "Your Joyful Spirit", desc: "Your laughter is my favorite sound" },
                { icon: Gift, title: "Your Loving Heart", desc: "Your love is the greatest gift" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <Card className="bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-pink-900/20 border-pink-200 dark:border-pink-800 shadow-xl">
                    <CardContent className="p-8 text-center">
                      <feature.icon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Final Message */}
        <Section>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 dark:from-pink-900/30 dark:via-rose-900/30 dark:to-purple-900/30 p-12 rounded-3xl border border-pink-200 dark:border-pink-700 shadow-2xl"
          >
            <div className="text-6xl mb-6">💕</div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Forever & Always
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              This little piece of the internet is dedicated to you, my love. 
              Every animation, every color, every heart represents a piece of my affection for you. 
              You are my inspiration, my joy, and my forever. ✨
            </p>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              className="text-4xl mt-8"
            >
              💖
            </motion.div>
          </motion.div>
        </Section>
      </div>
    </div>
  )
}
