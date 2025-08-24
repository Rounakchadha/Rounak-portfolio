'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '@/data/profile'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const segmentSize = 1 / (profile.projects.length + 1)

  useEffect(() => {
    // Set up About section initially hidden
    gsap.set(aboutSectionRef.current, { opacity: 0 })
    gsap.set(aboutContentRef.current, { opacity: 0, y: 30 })
    gsap.set('.about-word-mask', { overflow: 'hidden' })
    gsap.set(['.about-word-1', '.about-word-2', '.about-word-3', '.about-word-4'], { y: '100%' })

    // Create timeline for About section animation - FAST VERSION
    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `${(profile.projects.length - 0.5) * segmentSize * 100}% top`,
        end: "bottom top",
        scrub: 0.3,
        onEnter: () => {
          gsap.to(aboutSectionRef.current, { opacity: 1, duration: 0.2 })
        },
        onLeave: () => {
          gsap.set(aboutSectionRef.current, { opacity: 1 })
        },
        onEnterBack: () => {
          gsap.to(aboutSectionRef.current, { opacity: 1, duration: 0.2 })
        },
        onLeaveBack: () => {
          gsap.to(aboutSectionRef.current, { opacity: 0, duration: 0.2 })
          gsap.set(['.about-word-1', '.about-word-2', '.about-word-3', '.about-word-4'], { y: '100%' })
          gsap.set(aboutContentRef.current, { opacity: 0, y: 30 })
        }
      }
    })

    // Animate everything much faster and together
    aboutTimeline
      .to('.about-word-1', { y: '0%', duration: 0.2, ease: 'power2.out' })
      .to('.about-word-2', { y: '0%', duration: 0.2, ease: 'power2.out' }, '-=0.15')
      .to('.about-word-3', { y: '0%', duration: 0.2, ease: 'power2.out' }, '-=0.15')
      .to('.about-word-4', { y: '0%', duration: 0.2, ease: 'power2.out' }, '-=0.15')
      .to(aboutContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.15') // Start content animation almost immediately

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const sentences = profile.summary.split('. ').filter(s => s.length > 0)

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative bg-white"
      style={{ height: `${(profile.projects.length + 2) * 120}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* Projects Content */}
        <div className="w-full max-w-7xl mx-auto px-8">
          <h2 className="text-center text-6xl md:text-8xl font-black text-gray-900 mb-16">
            SELECTED <span className="text-emerald-700">PROJECTS</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Progressive Text Reveal */}
            <div className="relative h-[500px]">
              {profile.projects.map((project, index) => {
                const start = index * segmentSize
                const end = (index + 1) * segmentSize
                
                const titleStart = start
                const descStart = start + segmentSize * 0.15
                const techStart = start + segmentSize * 0.3
                const linksStart = start + segmentSize * 0.45
                const fadeOutStart = end - segmentSize * 0.2
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0 space-y-6"
                    style={{
                      pointerEvents: scrollYProgress.get() >= start && scrollYProgress.get() < fadeOutStart ? 'auto' : 'none'
                    }}
                  >
                    <motion.span 
                      className="text-sm font-mono text-gray-400 block"
                      style={{
                        opacity: useTransform(
                          scrollYProgress,
                          [titleStart, titleStart + 0.02, fadeOutStart, end],
                          [0, 1, 1, 0]
                        )
                      }}
                    >
                      0{index + 1} / 0{profile.projects.length}
                    </motion.span>
                    
                    <motion.h3 
                      className="text-4xl md:text-5xl font-black text-gray-900"
                      style={{
                        opacity: useTransform(
                          scrollYProgress,
                          [titleStart, titleStart + 0.02, fadeOutStart, end],
                          [0, 1, 1, 0]
                        ),
                        y: useTransform(
                          scrollYProgress,
                          [titleStart, titleStart + 0.02, fadeOutStart, end],
                          [30, 0, 0, -30]
                        )
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-lg text-gray-600 leading-relaxed"
                      style={{
                        opacity: useTransform(
                          scrollYProgress,
                          [descStart, descStart + 0.02, fadeOutStart, end],
                          [0, 1, 1, 0]
                        ),
                        y: useTransform(
                          scrollYProgress,
                          [descStart, descStart + 0.02, fadeOutStart, end],
                          [30, 0, 0, -30]
                        )
                      }}
                    >
                      {project.description}
                    </motion.p>
                    
                    {project.impact && (
                      <motion.p 
                        className="text-emerald-700 font-bold text-lg"
                        style={{
                          opacity: useTransform(
                            scrollYProgress,
                            [descStart, descStart + 0.02, fadeOutStart, end],
                            [0, 1, 1, 0]
                          )
                        }}
                      >
                        ↗ {project.impact}
                      </motion.p>
                    )}

                    <motion.div 
                      className="flex flex-wrap gap-3"
                      style={{
                        opacity: useTransform(
                          scrollYProgress,
                          [techStart, techStart + 0.02, fadeOutStart, end],
                          [0, 1, 1, 0]
                        ),
                        y: useTransform(
                          scrollYProgress,
                          [techStart, techStart + 0.02, fadeOutStart, end],
                          [30, 0, 0, -30]
                        )
                      }}
                    >
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-gray-100 text-sm font-medium rounded-full">
                          {tech}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="flex gap-8 pt-4"
                      style={{
                        opacity: useTransform(
                          scrollYProgress,
                          [linksStart, linksStart + 0.02, fadeOutStart, end],
                          [0, 1, 1, 0]
                        ),
                        y: useTransform(
                          scrollYProgress,
                          [linksStart, linksStart + 0.02, fadeOutStart, end],
                          [30, 0, 0, -30]
                        )
                      }}
                    >
                      {project.links.github && (
                        <a 
                          href={project.links.github} 
                          className="text-gray-900 font-bold hover:text-emerald-700 transition-colors"
                        >
                          VIEW CODE →
                        </a>
                      )}
                      {project.links.live && (
                        <a 
                          href={project.links.live} 
                          className="text-gray-900 font-bold hover:text-emerald-700 transition-colors"
                        >
                          LIVE DEMO →
                        </a>
                      )}
                    </motion.div>
                  </div>
                )
              })}
            </div>

            {/* Right Side - Card */}
            <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1500px' }}>
              {profile.projects.map((project, index) => {
                const start = index * segmentSize
                const end = (index + 1) * segmentSize
                
                const cardAppear = start
                const cardStraight = start + segmentSize * 0.2
                const cardHold = start + segmentSize * 0.7
                const cardFlip = end
                
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    style={{
                      transformStyle: 'preserve-3d',
                      rotateX: useTransform(
                        scrollYProgress,
                        [
                          Math.max(0, cardAppear - 0.01),
                          cardAppear,
                          cardStraight,
                          cardHold,
                          cardFlip,
                          Math.min(1, cardFlip + 0.01)
                        ],
                        [90, 90, 0, 0, -90, -90]
                      ),
                      opacity: useTransform(
                        scrollYProgress,
                        [
                          cardAppear,
                          cardAppear + 0.01,
                          cardFlip - 0.01,
                          cardFlip
                        ],
                        [0, 1, 1, 0]
                      ),
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl shadow-2xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-[200px] font-black">
                          0{index + 1}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                        <h4 className="text-3xl font-bold text-white mb-2">
                          {project.title}
                        </h4>
                        <p className="text-white/80">
                          {project.tech.slice(0, 3).join(' • ')}
                        </p>
                      </div>

                      <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* About Section Overlay */}
        <div 
          ref={aboutSectionRef}
          className="absolute inset-0 bg-white flex items-center opacity-0"
        >
          <div className="px-8 md:px-16 lg:px-32 w-full">
            <div className="max-w-7xl mx-auto">
              
              <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-16">
                <div className="leading-[0.9]">
                  <span className="about-word-mask inline-block overflow-hidden">
                    <span className="about-word-1 inline-block">FULL-STACK</span>
                  </span>{' '}
                  <span className="about-word-mask inline-block overflow-hidden">
                    <span className="about-word-2 inline-block text-emerald-700">DEVELOPER.</span>
                  </span>
                </div>
                <div className="leading-[0.9]">
                  <span className="about-word-mask inline-block overflow-hidden">
                    <span className="about-word-3 inline-block">SOFTWARE</span>
                  </span>{' '}
                  <span className="about-word-mask inline-block overflow-hidden">
                    <span className="about-word-4 inline-block text-emerald-700">ENGINEER.</span>
                  </span>
                </div>
              </h2>

              <div ref={aboutContentRef} className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-6">
                  {sentences.map((sentence, index) => (
                    <p key={index} className="text-xl text-gray-700 text-justify">
                      {sentence}{index < sentences.length - 1 ? '.' : ''}
                    </p>
                  ))}
                </div>
                <div className="space-y-8">
                  <h3 className="text-3xl font-black">HIGHLIGHTS</h3>
                  {profile.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="text-emerald-700 text-3xl">→</span>
                      <span className="text-lg">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add spacer div at the bottom */}
      <div className="h-[50vh]" aria-hidden="true"></div>
    </section>
  )
}
