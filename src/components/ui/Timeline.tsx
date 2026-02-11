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
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-cream overflow-hidden perspective-1000">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-stone-200 -translate-x-1/2 hidden md:block" />

        <div className="space-y-40 md:space-y-60">
          {timelineData.map((item, index) => (
            <EnhancedPolaroid key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EnhancedPolaroid({ item, index }: { item: any, index: number }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  // Enhanced 3D Animations
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    isEven ? [-50, 0] : [50, 0] 
  )
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [item.rotate * 3, item.rotate])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const rotateY = useTransform(scrollYProgress, [0, 1], [isEven ? -15 : 15, 0])

  return (
    <div ref={ref} className={cn(
      "relative flex flex-col md:flex-row items-center gap-12 md:gap-24 perspective-1000",
      isEven ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      
      {/* Polaroid Side */}
      <motion.div 
        style={{ x, opacity, rotate, scale, rotateY }} 
        className="flex-1 w-full flex justify-center"
      >
        <div className={cn(
          "relative bg-white p-4 pb-16 shadow-2xl border border-stone-100 transform transition-transform duration-500 w-full max-w-sm hover:scale-105 hover:z-20 hover:rotate-0 cursor-pointer",
        )}>
           {/* Tape Effect */}
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 rotate-1 shadow-sm backdrop-blur-[1px] border-l border-r border-white/50 z-20" />
           
           <div className="relative w-full aspect-[4/5] overflow-hidden bg-stone-50 mb-6 ring-1 ring-stone-900/5">
             <Image
               src={item.image}
               alt={item.title}
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             />
             {/* No overlay, just pure image */}
           </div>
           
           {/* Handwriting on Polaroid */}
           <div className="text-center font-handwriting text-stone-600 transform -rotate-1">
             <p className="text-3xl">{item.date}</p>
           </div>
        </div>
      </motion.div>

      {/* Text/Caption Side */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 30 : -30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className={cn(
          "flex-1 text-center md:text-left space-y-4", 
          isEven ? "md:text-left" : "md:text-right"
        )}
      >
        <h3 className="font-playfair text-6xl md:text-7xl text-stone-800 leading-tight">
          {item.title}
        </h3>
        <p className="font-handwriting text-3xl md:text-4xl text-stone-500 max-w-sm mx-auto md:mx-0 inline-block">
          {item.description}
        </p>
      </motion.div>
      
      {/* Center Dot for Desktop */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-rose-300 rounded-full border-4 border-cream z-0 hidden md:block shadow-lg" />

    </div>
  )
}
