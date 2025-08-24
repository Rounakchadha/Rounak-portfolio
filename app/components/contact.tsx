'use client'

import { useRef, useEffect } from 'react'
import { profile } from '@/data/profile'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !pillRef.current || !bgRef.current) return

    // Text animations - EXACTLY like Hero section
    // Row 1 - Moving Left
    gsap.to('.tech-text-row-1', {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1
    })

    // Row 2 - Moving Right
    gsap.fromTo('.tech-text-row-2', 
      { xPercent: -50 },
      { 
        xPercent: 0,
        duration: 50,
        ease: 'none',
        repeat: -1
      }
    )

    // Row 3 - Moving Left (faster)
    gsap.to('.tech-text-row-3', {
      xPercent: -50,
      duration: 35,
      ease: 'none',
      repeat: -1
    })

    // Row 4 - Moving Right (slower)
    gsap.fromTo('.tech-text-row-4', 
      { xPercent: -50 },
      { 
        xPercent: 0,
        duration: 60,
        ease: 'none',
        repeat: -1
      }
    )

    // Row 5 - Moving Left
    gsap.to('.tech-text-row-5', {
      xPercent: -50,
      duration: 45,
      ease: 'none',
      repeat: -1
    })

    // Main scroll scene for morphing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      }
    })

    // Initial states
    gsap.set(pillRef.current, {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    })
    gsap.set(bgRef.current, { backgroundColor: '#1e40af' })
    gsap.set('.mask-line', { yPercent: 100, opacity: 0 })
    gsap.set('.cta-button', { y: 24, opacity: 0 })
    gsap.set('.contact-info', { y: 24, opacity: 0 })

    // Timeline
    tl.to(pillRef.current, { width: '60vw', height: '40vh', borderRadius: '1000px' }, 0.3)
    tl.to(bgRef.current, { backgroundColor: '#ffffff' }, 0.3)
    tl.to('.mask-line', { yPercent: 0, opacity: 1, duration: 0.3, stagger: 0.1 }, 0.5)
    tl.to('.cta-button', { opacity: 1, y: 0 }, 0.8)
    tl.to('.contact-info', { opacity: 1, y: 0 }, 0.9)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background */}
      <div ref={bgRef} className="fixed inset-0" />

      {/* Morphing container with moving text */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          ref={pillRef}
          className="relative overflow-hidden"
          style={{
            backgroundColor: '#2563eb',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Moving Background Text - WITH BLEND MODE TO REMOVE OVERLAY EFFECT */}
          <div 
            className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            style={{ mixBlendMode: 'color-burn' }}
          >
            {/* Row 1 - Moving Left */}
            <div className="relative whitespace-nowrap overflow-hidden -rotate-12">
              <div className="tech-text-row-1 inline-flex">
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  REACT • NEXT.JS • TYPESCRIPT • NODE.JS • EXPRESS • MONGODB •
                </span>
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  REACT • NEXT.JS • TYPESCRIPT • NODE.JS • EXPRESS • MONGODB •
                </span>
              </div>
            </div>
            
            {/* Row 2 - Moving Right */}
            <div className="relative whitespace-nowrap overflow-hidden rotate-6">
              <div className="tech-text-row-2 inline-flex">
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  PYTHON • DJANGO • FASTAPI • DOCKER • KUBERNETES • AWS •
                </span>
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  PYTHON • DJANGO • FASTAPI • DOCKER • KUBERNETES • AWS •
                </span>
              </div>
            </div>

            {/* Row 3 - Moving Left */}
            <div className="relative whitespace-nowrap overflow-hidden -rotate-9">
              <div className="tech-text-row-3 inline-flex">
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  GRAPHQL • REST API • POSTGRESQL • REDIS • FIREBASE •
                </span>
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  GRAPHQL • REST API • POSTGRESQL • REDIS • FIREBASE •
                </span>
              </div>
            </div>

            {/* Row 4 - Moving Right */}
            <div className="relative whitespace-nowrap overflow-hidden rotate-12">
              <div className="tech-text-row-4 inline-flex">
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  TAILWIND • SASS • WEBPACK • VITE • JEST • CYPRESS •
                </span>
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  TAILWIND • SASS • WEBPACK • VITE • JEST • CYPRESS •
                </span>
              </div>
            </div>

            {/* Row 5 - Moving Left */}
            <div className="relative whitespace-nowrap overflow-hidden -rotate-6">
              <div className="tech-text-row-5 inline-flex">
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  GIT • CI/CD • AGILE • MICROSERVICES • SERVERLESS • AI/ML •
                </span>
                <span className="text-[8vw] font-black text-blue-400 px-8">
                  GIT • CI/CD • AGILE • MICROSERVICES • SERVERLESS • AI/ML •
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main heading */}
<div className="fixed inset-0 flex items-center justify-center z-10">
  <div className="text-center">
    <div className="overflow-hidden">
      <h2 className="mask-line text-white text-6xl md:text-8xl font-black">
        LET&apos;S BUILD
      </h2>
    </div>
    <div className="overflow-hidden">
      <h2 className="mask-line text-white text-6xl md:text-8xl font-black">
        SOMETHING
      </h2>
    </div>
    <div className="overflow-hidden">
      <h2 className="mask-line text-[#4ECDC4] text-6xl md:text-8xl font-black">
        AMAZING
      </h2>
    </div>
  </div>
</div>

      {/* CTA button - Black minimal design */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20">
        <a
          href={`mailto:${profile.email}`}
          className="cta-button inline-block bg-black text-white px-10 py-4 text-xl font-black rounded-full shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all"
        >
          GET IN TOUCH
        </a>
      </div>

      {/* Contact info */}
      <div className="contact-info fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col md:flex-row items-center gap-6 text-sm md:text-base text-gray-700">
          <a href={`mailto:${profile.email}`} className="font-semibold hover:text-[#4ECDC4] transition-colors">
            {profile.email}
          </a>
          {profile.phone && (
            <a href={`tel:${profile.phone}`} className="font-semibold hover:text-[#4ECDC4] transition-colors">
              {profile.phone}
            </a>
          )}
          <div className="flex gap-6">
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="font-semibold hover:text-[#4ECDC4] transition-colors">
              LINKEDIN
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="font-semibold hover:text-[#4ECDC4] transition-colors">
              GITHUB
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
