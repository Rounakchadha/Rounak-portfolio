'use client'

import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'

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
