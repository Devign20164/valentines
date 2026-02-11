'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function Hero() {

  const scrollToTimeline = () => {
    const timeline = document.getElementById('timeline')
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth' })
    } else {
       window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-rose-950 flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <Image
                src="/images/hero-bg.png" // Updated to use the new purple hearts background
                alt="Purple Hearts Background"
                fill
                className="object-cover opacity-90"
                priority
            />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 px-4">
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-lg">
            <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="block"
            >
                Forever
            </motion.span>
            <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                className="block italic text-pink-200"
            >
                & Always
            </motion.span>
            </h1>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-white/80 hover:text-white transition-colors"
            onClick={scrollToTimeline}
        >
            <ChevronDown className="w-10 h-10 md:w-12 md:h-12 drop-shadow-md" />
        </motion.div>
    </section>
  )
}
