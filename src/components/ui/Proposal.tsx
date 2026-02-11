'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { cn } from '@/lib/utils'
import { Heart, MailOpen, X } from 'lucide-react'

export default function Proposal() {
  const [isOpen, setIsOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 })
  const [noBtnHovered, setNoBtnHovered] = useState(false)
  const [noBtnText, setNoBtnText] = useState('No 💔')
  const containerRef = useRef<HTMLDivElement>(null)

  const noPhrases = [
    "Are you sure?",
    "Really sure?",
    "Think again 😜",
    "Last chance!",
    "You don't mean that...",
    "Please? 🥺",
    "I'll be sad...",
    "Have a heart! ❤️",
  ]

  const handleNoHover = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const x = Math.random() * (containerRect.width - 200) - (containerRect.width / 2 - 100)
      const y = Math.random() * (containerRect.height - 200) - (containerRect.height / 2 - 100)
      
      setNoBtnPosition({ x, y })
      setNoBtnHovered(true)
      setNoBtnText(noPhrases[Math.floor(Math.random() * noPhrases.length)])
    }
  }

  const handleYesClick = () => {
    setAccepted(true)
    triggerConfetti()
  }

  const triggerConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-rose-50 overflow-hidden py-20"
    >
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-200 via-transparent to-transparent" />

      <AnimatePresence mode="wait">
        {!isOpen && !accepted && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer group relative"
          >
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative w-80 h-52 bg-rose-100 shadow-2xl rounded-lg border-2 border-rose-200 flex items-center justify-center overflow-hidden"
             >
                <div className="absolute inset-0 bg-white/40" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-200 rounded-full blur-2xl opacity-50" />
                
                <div className="z-10 text-rose-400 flex flex-col items-center gap-2 transition-transform duration-300 group-hover:scale-110">
                   <MailOpen className="w-12 h-12" />
                   <span className="font-playfair italic text-lg text-rose-800">For You</span>
                </div>
             </motion.div>
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/10 blur-md rounded-full" />
          </motion.div>
        )}

        {isOpen && !accepted && (
          <motion.div 
            key="letter"
            initial={{ opacity: 0, y: 20, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative bg-white p-8 md:p-12 shadow-2xl rounded-sm max-w-lg w-full mx-4 border border-rose-50"
            style={{ 
               backgroundImage: "linear-gradient(#e5e5f7 1px, transparent 1px), linear-gradient(90deg, #e5e5f7 1px, transparent 1px)",
               backgroundSize: "20px 20px"
            }}
          >
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-orange-50/30 mix-blend-multiply pointer-events-none rounded-sm" />

            <div className="relative z-10 text-center space-y-8">
              <span className="inline-block text-4xl">💌</span>
              
              <h2 className="text-3xl md:text-5xl font-playfair text-stone-800 leading-tight">
                Will you be my Valentine?
              </h2>

              <p className="font-sans text-stone-500 italic">
                There's no one else I'd rather share this day with.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4 relative h-32 md:h-16">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="px-8 py-3 bg-rose-500 text-white font-medium rounded-full shadow-lg hover:bg-rose-600 transition-colors flex items-center gap-2 z-20"
                >
                  YES, Absolutely! 💖
                </motion.button>

                <motion.button
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover} 
                  animate={{ 
                    x: noBtnHovered ? noBtnPosition.x : 0, 
                    y: noBtnHovered ? noBtnPosition.y : 0 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="px-6 py-3 bg-white border border-stone-200 text-stone-500 font-medium rounded-full hover:bg-stone-50 transition-colors z-10"
                   style={{ 
                     width: 'max-content'
                   }}
                >
                  {noBtnText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {accepted && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center z-20 p-8 md:p-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-rose-100 max-w-xl mx-4"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl mb-6 inline-block"
            >
              💑
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-playfair text-rose-600 mb-6 leading-tight">
              Yay! It's a date! ❤️
            </h2>
             <p className="text-xl text-stone-600 font-light">
              I love you so much.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
