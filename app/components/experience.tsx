'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { profile } from '@/data/profile'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  const scrollProgress = useMotionValue(0)
  const timelineHeight = 400

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Pin the entire experience section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${profile.experience.length * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          scrollProgress.set(progress)
          
          // Calculate current experience based on scroll progress
          const experienceIndex = Math.floor(progress * profile.experience.length)
          const clampedIndex = Math.min(experienceIndex, profile.experience.length - 1)
          setCurrentIndex(clampedIndex)
          
          // Animate experience content based on progress
          profile.experience.forEach((_, index) => {
            const experienceProgress = (progress * profile.experience.length) - index
            const opacity = Math.max(0, Math.min(1, 1 - Math.abs(experienceProgress - 0.5) * 2))
            const y = experienceProgress < 0 ? 50 : experienceProgress > 1 ? -50 : 0
            
            gsap.set(`.experience-${index}`, {
              opacity: opacity,
              y: y,
              duration: 0
            })
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [scrollProgress])

  const handleTimelineClick = (event: React.MouseEvent) => {
    if (!timelineRef.current) return
    
    const timelineRect = timelineRef.current.getBoundingClientRect()
    const relativeY = Math.max(0, Math.min(event.clientY - timelineRect.top, timelineHeight))
    const progress = relativeY / timelineHeight
    
    scrollProgress.set(progress)
    
    const experienceIndex = Math.floor(progress * profile.experience.length)
    const clampedIndex = Math.min(experienceIndex, profile.experience.length - 1)
    setCurrentIndex(clampedIndex)
  }

  const jumpToExperience = (index: number) => {
    const progress = index / (profile.experience.length - 1)
    scrollProgress.set(progress)
    setCurrentIndex(index)
  }

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="min-h-screen bg-white"
    >
      {/* Added extra top padding to prevent heading cutoff */}
      <div className="h-screen flex flex-col pt-16 pb-8">
        <div className="w-full px-8 md:px-16 lg:px-32 flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
            
            {/* Header - Now with proper top spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-shrink-0 mb-8 md:mb-12"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase text-emerald-700 mb-4 md:mb-6">
                Experience
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                My professional journey and key experiences
              </p>
            </motion.div>

            {/* Main content area */}
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <div className="grid lg:grid-cols-[300px,1fr] gap-12 lg:gap-16 items-start">
                  
                  {/* Left Side - Interactive Timeline */}
                  <div className="space-y-6 lg:space-y-8">
                    
                    {/* Interactive Timeline */}
                    <div className="relative flex justify-center">
                      <div 
                        ref={timelineRef}
                        className="relative cursor-pointer select-none"
                        onClick={handleTimelineClick}
                        style={{ height: `${timelineHeight}px` }}
                      >
                        {/* Background line */}
                        <div className="w-1 h-full bg-gray-200 rounded-full absolute left-1/2 transform -translate-x-1/2" />
                        
                        {/* Progress line */}
                        <motion.div 
                          className="w-1 bg-emerald-700 rounded-full absolute left-1/2 transform -translate-x-1/2"
                          style={{
                            height: useTransform(scrollProgress, [0, 1], ['0%', '100%'])
                          }}
                        />
                        
                        {/* Experience markers */}
                        {profile.experience.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              jumpToExperience(index)
                            }}
                            className={`absolute w-3 h-3 rounded-full border-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                              currentIndex === index 
                                ? 'bg-emerald-700 border-emerald-700 scale-125' 
                                : 'bg-white border-gray-400 hover:border-emerald-700 hover:scale-110'
                            }`}
                            style={{
                              top: `${(index / (profile.experience.length - 1)) * 100}%`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Experience Counter */}
                    <div className="text-center">
                      <span className="text-sm font-mono text-gray-500">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(profile.experience.length).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Current Experience Title */}
                    <motion.div 
                      className="text-center"
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-bold text-gray-900">
                        {profile.experience[currentIndex]?.role}
                      </h3>
                      <p className="text-sm text-emerald-700">
                        {profile.experience[currentIndex]?.company}
                      </p>
                    </motion.div>
                  </div>

                  {/* Right Side - Experience Content */}
                  <div className="relative h-[350px] lg:h-[400px] flex items-center">
                    {profile.experience.map((exp, index) => (
                      <div
                        key={index}
                        className={`experience-${index} absolute inset-0 flex items-center`}
                        style={{ opacity: 0 }}
                      >
                        <div className="w-full">
                          
                          {/* Duration Badge */}
                          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4 md:mb-6">
                            {exp.duration}
                          </div>
                          
                          {/* Role & Company */}
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-2 md:mb-3">
                            {exp.role}
                          </h3>
                          
                          <p className="text-lg md:text-xl text-emerald-700 font-bold mb-6 md:mb-8">
                            {exp.company} • {exp.location}
                          </p>
                          
                          {/* Responsibilities */}
                          <div className="space-y-3 md:space-y-4 max-h-[200px] md:max-h-[220px] overflow-y-auto">
                            {exp.bullets.map((bullet, i) => (
                              <div key={i} className="flex items-start gap-3 md:gap-4">
                                <span className="text-emerald-700 text-lg md:text-xl font-bold flex-shrink-0 mt-1">→</span>
                                <span className="text-base md:text-lg text-gray-700 leading-relaxed">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
