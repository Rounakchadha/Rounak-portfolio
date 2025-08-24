// app/components/ScrollAnimations.tsx
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimations({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in elements on scroll
      gsap.utils.toArray('.fade-in-scroll').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Parallax images
      gsap.utils.toArray('.parallax-img').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      // Text reveal animation
      gsap.utils.toArray('.text-reveal').forEach((element: any) => {
        gsap.fromTo(element,
          {
            backgroundSize: '0% 100%'
          },
          {
            backgroundSize: '100% 100%',
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return <div ref={containerRef}>{children}</div>
}
