'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

const timelineData = [
  {
    date: 'October 20, 2025',
    title: 'Our First Date',
    description: 'The beginning of our forever.',
    image: '/images/t1.jpg',
    rotate: -2,
  },
  {
    date: 'November 28, 2025',
    title: 'Your Pinning',
    description: 'Ceremony & meeting your family. So proud of you.',
    image: '/images/t2.jpg',
    rotate: 3,
  },
  {
    date: 'December 29, 2025',
    title: 'First Swimming',
    description: 'Our first swimming adventure together.',
    image: '/images/t3.jpg',
    rotate: -3,
  },
  {
    date: 'January 24, 2026',
    title: 'First Outing',
    description: 'Our first real outing together. Making memories.',
    image: '/images/t4.jpg',
    rotate: 2,
  },
]

export default function Timeline() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Horizontal movement based on vertical scroll
  // We have 4 items. We need to move left enough to show them all.
  // 4 items * roughly 80vw or 500px + gaps. 
  // Let's try moving from 10% to -85% (adjusted for screen width)
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-85%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-cream">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Texture Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />
        
        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-12 md:px-24">
          {timelineData.map((item, index) => (
             <HorizontalPolaroid key={index} item={item} index={index} />
          ))}
        </motion.div>

        {/* Scroll Prompt (visible only at start) */}
        <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-400 font-handwriting text-xl animate-bounce"
        >
            Scroll Down to Explore 
        </motion.div>

      </div>
    </section>
  )
}

function HorizontalPolaroid({ item, index }: { item: any, index: number }) {
  return (
    <div className="relative group perspective-1000">
        <motion.div 
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className={cn(
                "relative bg-white p-4 pb-16 shadow-xl border border-stone-100 w-[80vw] md:w-[600px] flex-shrink-0 transform transition-all duration-500",
            )}
            style={{ rotate: item.rotate }}
        >
           {/* Tape Effect */}
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 rotate-1 shadow-sm backdrop-blur-[1px] border-l border-r border-white/50 z-20" />
           
           {/* Image Container */}
           <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-50 mb-6 ring-1 ring-stone-900/5">
     
             <Image
               src={item.image}
               alt={item.title}
               fill
               className="object-cover"
               sizes="(max-width: 768px) 80vw, 600px"
               priority
             />
           </div>
           
           {/* Handwriting Labels */}
           <div className="text-center font-handwriting text-stone-600 space-y-2">
             <h3 className="text-4xl md:text-5xl text-stone-800">{item.title}</h3>
             <p className="text-2xl text-stone-500">{item.date}</p>
             <p className="text-xl md:text-2xl text-stone-400 font-sans tracking-wide mt-4 opacity-80 max-w-sm mx-auto">
                {item.description}
             </p>
           </div>
        </motion.div>
    </div>
  )
}
