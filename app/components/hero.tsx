'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [navbarPosition, setNavbarPosition] = useState<'bottom' | 'top'>('bottom')
  const [navbarStyle, setNavbarStyle] = useState<'white' | 'black'>('white')
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Custom smooth scroll function with slower duration
  const smoothScrollTo = (targetY: number, duration: number = 2000) => {
    const startY = window.scrollY
    const distance = targetY - startY
    const startTime = performance.now()

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeInOutQuad(progress)
      
      window.scrollTo(0, startY + distance * easeProgress)
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // Custom scroll function for navbar links
  const scrollToSection = (sectionId: string) => {
    // Handle Projects button - scroll deeper to show first card
    if (sectionId === 'projects') {
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        // Scroll deeper to show the first project card (add more offset)
        smoothScrollTo(rect.top + scrollTop + 600, 2000) // Increased offset to 600px
      }
      return
    }
    
    // Handle Work button - scroll to experience section
    if (sectionId === 'experience') {
      const experienceSection = document.getElementById('experience')
      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        smoothScrollTo(rect.top + scrollTop - 80, 2000) // 2 seconds for slow scroll
      }
      return
    }
    
    // Handle Contact button - scroll past the animation
    if (sectionId === 'contact') {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect()
        const absoluteTop = rect.top + window.pageYOffset
        // Calculate the final position after the morph animation
        const finalPosition = absoluteTop + (window.innerHeight * 2)
        
        // Use longer duration for Contact section
        smoothScrollTo(finalPosition, 6000) // 2.5 seconds for extra slow
      }
      return
    }
    
    // Default behavior for other sections
    const section = document.getElementById(sectionId)
    if (section) {
      const rect = section.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      smoothScrollTo(rect.top + scrollTop, 2000)
    }
  }

  useEffect(() => {
    // Handle navbar position and color
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setNavbarPosition(scrolled ? 'top' : 'bottom')
      
      // Change color when navbar reaches white background (typically after hero section)
      const heroHeight = window.innerHeight
      const shouldBeBlack = window.scrollY > heroHeight * 0.9
      setNavbarStyle(shouldBeBlack ? 'black' : 'white')
    }
    
    window.addEventListener('scroll', handleScroll)

    // Profile photo animation
    gsap.fromTo('.profile-photo',
      { scale: 0, opacity: 0, rotate: -180 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.5, ease: 'back.out(1.7)', delay: 0.5 }
    )

    // Text animations
    gsap.fromTo('.hero-text',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 1.2 }
    )

    // Background text animations
    gsap.to('.bg-text-row-1', {
      xPercent: -50,
      duration: 60,
      ease: 'none',
      repeat: -1
    })

    gsap.fromTo('.bg-text-row-2', 
      { xPercent: -50 },
      { 
        xPercent: 0,
        duration: 80,
        ease: 'none',
        repeat: -1
      }
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <>
      {/* Navigation - Bottom Right to Top */}
      <AnimatePresence mode="wait">
        <motion.nav
          key={navbarPosition}
          initial={navbarPosition === 'bottom' 
            ? { bottom: 40, top: 'auto', opacity: 0 }
            : { top: -100, bottom: 'auto', opacity: 1 }
          }
          animate={navbarPosition === 'bottom'
            ? { bottom: 40, top: 'auto', opacity: 1 }
            : { top: 0, bottom: 'auto', opacity: 1 }
          }
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed left-0 right-0 z-50 px-8 py-4 ${
            navbarPosition === 'top' && navbarStyle === 'black' 
              ? 'bg-transparent' 
              : ''
          }`}
        >
          <div className={`${
            navbarPosition === 'top' && navbarStyle === 'black' 
              ? 'flex justify-between items-center' 
              : 'flex justify-end'
          }`}>
            {/* RC Logo - only show when navbar is at top with black style */}
            {navbarPosition === 'top' && navbarStyle === 'black' && (
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo(0, 2000)
                }}
                className="text-2xl font-bold text-gray-900 cursor-pointer"
              >
                RC
              </a>
            )}
            
            {/* Navigation links with custom scroll behavior - REMOVED ABOUT */}
            <div className={`flex items-center gap-10 text-base font-medium transition-colors duration-300 ${
              navbarStyle === 'white' ? 'text-white' : 'text-gray-900'
            }`}>
              <a 
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('projects')
                }}
                className={`cursor-pointer transition-colors duration-200 ${
                  navbarStyle === 'white' ? 'hover:text-emerald-300' : 'hover:text-emerald-700'
                }`}
              >
                Projects
              </a>
              <a 
                href="#experience"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('experience')
                }}
                className={`cursor-pointer transition-colors duration-200 ${
                  navbarStyle === 'white' ? 'hover:text-emerald-300' : 'hover:text-emerald-700'
                }`}
              >
                Work
              </a>
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
                className={`cursor-pointer transition-colors duration-200 ${
                  navbarStyle === 'white' ? 'hover:text-emerald-300' : 'hover:text-emerald-700'
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-screen bg-emerald-700 overflow-hidden">
        {/* Moving Background Text */}
        <div className="absolute inset-0 flex flex-col justify-center opacity-[0.03] pointer-events-none">
          <div className="relative whitespace-nowrap overflow-hidden">
            <div className="bg-text-row-1 inline-flex">
              <span className="text-[15vw] font-black text-white px-8">
                DEVELOPER • ENGINEER • CREATOR • INNOVATOR •
              </span>
              <span className="text-[15vw] font-black text-white px-8">
                DEVELOPER • ENGINEER • CREATOR • INNOVATOR •
              </span>
            </div>
          </div>
          
          <div className="relative whitespace-nowrap overflow-hidden">
            <div className="bg-text-row-2 inline-flex">
              <span className="text-[15vw] font-black text-white px-8">
                FULL-STACK • FRONTEND • BACKEND • MOBILE •
              </span>
              <span className="text-[15vw] font-black text-white px-8">
                FULL-STACK • FRONTEND • BACKEND • MOBILE •
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-10 min-h-screen flex items-center justify-center px-8"
        >
          <div className="text-center max-w-4xl mx-auto">
            {/* Profile Photo */}
            <div className="profile-photo relative w-64 h-64 md:w-72 md:h-72 mx-auto mb-8">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <Image
                  src="/profile-photo.jpg"
                  alt="Rounak Chadha"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-400 rounded-full border-4 border-emerald-700 animate-pulse" />
            </div>

            {/* Name */}
            <h1 className="hero-text text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Rounak Chadha
            </h1>

            {/* Role */}
            <p className="hero-text text-xl md:text-2xl text-emerald-100 mb-8 font-light">
              Full-Stack Developer & Software Engineer
            </p>

            {/* Description */}
            <p className="hero-text text-lg md:text-xl text-emerald-50 leading-relaxed max-w-2xl mx-auto mb-12 opacity-90">
              I craft scalable digital solutions that bridge the gap between elegant design and powerful functionality. 
              Specializing in modern web technologies, AR/VR experiences, and AI-driven applications.
            </p>

            {/* CTA Buttons */}
            <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('projects')
                }}
                className="px-8 py-3 bg-white text-emerald-700 rounded-full font-medium hover:bg-emerald-50 transition-all shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="/rounak-chadha-cv.pdf"
                download="Rounak_Chadha_CV.pdf"
                className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </motion.a>
            </div>
            
            {/* Social Links */}
            <div className="hero-text flex justify-center gap-6 mt-12">
              <a href="https://github.com" className="text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:hello@example.com" className="text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
