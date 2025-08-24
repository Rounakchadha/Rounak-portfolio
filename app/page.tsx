'use client'

import Hero from './components/hero'
import Projects from './components/projects'
import Experience from './components/experience'
import Skills from './components/skills'
import Contact from './components/contact'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/smoothScroll'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <div className="min-h-screen">
          <main>
            <Hero />
            <Projects /> {/* This now includes the About section */}
            {/* Remove this line: <About /> */}
            <Experience />
            <Skills />
            <Contact />
          </main>
        </div>
      </SmoothScroll>
    </>
  )
}
