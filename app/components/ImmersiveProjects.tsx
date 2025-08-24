// app/components/ImmersiveProjects.tsx
'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "CerviCare",
    subtitle: "AI-Powered Healthcare",
    description: "Revolutionary cervical cancer awareness platform",
    color: "#FF006E",
    image: "/projects/cervicare.jpg"
  },
  {
    title: "Deepfake Detection",
    subtitle: "Neural Networks",
    description: "93% accuracy in real-time detection",
    color: "#00F5FF",
    image: "/projects/deepfake.jpg"
  },
  {
    title: "GreenPearl",
    subtitle: "Predictive Analytics",
    description: "House price prediction with 80% accuracy",
    color: "#8338EC",
    image: "/projects/greenpearl.jpg"
  }
]

export default function ImmersiveProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project, index) => {
        // Pin each project
        ScrollTrigger.create({
          trigger: project,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          scrub: 1,
        })

        // Parallax effect for images
        const image = project.querySelector('.project-image')
        gsap.fromTo(image,
          { scale: 1.5, y: -100 },
          {
            scale: 1,
            y: 100,
            scrollTrigger: {
              trigger: project,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )

        // Text animations
        const title = project.querySelector('.project-title')
        const content = project.querySelector('.project-content')
        
        gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          }
        })
        .fromTo(title, 
          { x: -200, opacity: 0 },
          { x: 0, opacity: 1 }
        )
        .fromTo(content,
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1 },
          '-=0.5'
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {projects.map((project, index) => (
        <div
          key={index}
          ref={el => projectRefs.current[index] = el!}
          className="relative h-screen flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: project.color + '10' }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 project-image">
            <div className="relative w-full h-full opacity-20">
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black"
                style={{ backgroundColor: project.color + '40' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="project-title">
              <h2 
                className="text-6xl md:text-8xl font-bold mb-4"
                style={{ color: project.color }}
              >
                {project.title}
              </h2>
              <p className="text-2xl text-gray-300 mb-2">{project.subtitle}</p>
            </div>
            
            <div className="project-content">
              <p className="text-xl text-gray-400 mb-8">{project.description}</p>
              <button 
                className="px-8 py-4 border-2 text-white hover:scale-105 transition-transform"
                style={{ borderColor: project.color }}
              >
                View Project
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
