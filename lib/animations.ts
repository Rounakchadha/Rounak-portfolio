import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initScrollAnimations = () => {
  // Refresh ScrollTrigger on load
  ScrollTrigger.refresh()

  // Hero text animation
  gsap.utils.toArray('.split-text').forEach((text: any) => {
    gsap.from(text, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
      },
    })
  })

  // Fade up animations
  gsap.utils.toArray('.fade-up').forEach((element: any) => {
    gsap.from(element, {
      y: 60,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
      },
    })
  })

  // Timeline animations
  gsap.utils.toArray('.timeline-item').forEach((item: any, index) => {
    gsap.from(item, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
    })
  })

  // Project cards animation
  gsap.utils.toArray('.project-card').forEach((card: any, index) => {
    gsap.from(card, {
      scale: 0.95,
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
    })
  })

  // Skill chips animation
  gsap.utils.toArray('.skill-category').forEach((category: any) => {
    const chips = category.querySelectorAll('span')
    gsap.from(chips, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      scrollTrigger: {
        trigger: category,
        start: 'top 80%',
      },
    })
  })
}
