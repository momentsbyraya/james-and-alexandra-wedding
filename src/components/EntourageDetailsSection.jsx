import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import EntourageTextContent from './EntourageTextContent'
import './pages/Details.css'
import './pages/Entourage.css'
import { createScrollTriggerScope, scheduleGsapRevealFallback } from '../utils/safariCompat'

gsap.registerPlugin(ScrollTrigger)

const EntourageDetailsSection = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const scrollScope = useMemo(() => createScrollTriggerScope(), [])

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
    if (tl.scrollTrigger) scrollScope.add(tl.scrollTrigger)

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    const body = contentRef.current
    if (body) {
      const nameLines = body.querySelectorAll('p.font-poppins')
      if (nameLines.length) {
        gsap.set(nameLines, { opacity: 0, y: 20 })
        scrollScope.add(
          ScrollTrigger.create({
            trigger: body,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(nameLines, {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: 'power2.out',
                stagger: 0.035,
              })
            },
            toggleActions: 'play none none reverse',
          })
        )
      }
    }

    const cancelFallback = scheduleGsapRevealFallback(
      [headerRef.current, contentRef.current],
      { delayMs: 3000 }
    )

    return () => {
      tl.kill()
      scrollScope.kill()
      cancelFallback()
    }
  }, [scrollScope])

  const accentColor = themeConfig.text.burgundyDark ?? '#094a2f'

  return (
    <section
      ref={sectionRef}
      id="entourage"
      data-section="entourage"
      className="relative w-full pb-12"
    >
      <div className="site-content-width entourage-names-single-line min-w-0">
        <h2
          ref={headerRef}
          className="text-2xl sm:text-3xl md:text-4xl mb-8 font-boska text-center"
          style={{ color: accentColor }}
        >
          Entourage
        </h2>

        <div ref={contentRef}>
          <EntourageTextContent accentColor={accentColor} />
        </div>
      </div>
    </section>
  )
}

export default EntourageDetailsSection
