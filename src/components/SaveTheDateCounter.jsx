import React, { useState, useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getTimeUntilWedding } from '../utils/countdown'
import { couple, prenupImages } from '../data'
import './pages/Details.css'
import { createScrollTriggerScope } from '../utils/safariCompat'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const SAVE_THE_DATE_BG = prenupImages.countdownBackground

const SaveTheDateCounter = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const countdownRef = useRef(null)
  const scrollScope = useMemo(() => createScrollTriggerScope(), [])

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let titleTween
    if (titleRef.current) {
      titleTween = gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      if (titleTween.scrollTrigger) scrollScope.add(titleTween.scrollTrigger)
    }

    if (countdownRef.current) {
      const els = countdownRef.current.querySelectorAll('.countdown-number')
      if (els.length) {
        gsap.set(els, { opacity: 1, y: 0 })
      }
    }

    return () => {
      titleTween?.scrollTrigger?.kill()
      titleTween?.kill()
      scrollScope.kill()
    }
  }, [scrollScope])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20"
    >
      <img
        src={SAVE_THE_DATE_BG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: 'center 38%' }}
        loading="lazy"
        decoding="async"
        draggable={false}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-forest/35 via-forest/20 to-forest/45"
        aria-hidden
      />

      <div className="relative z-10 site-content-width flex flex-col justify-between min-h-[400px] sm:min-h-[500px] md:min-h-[600px] min-[992px]:min-h-[760px]">
        {/* Title */}
        <div className="text-center">
          <h2
            ref={titleRef}
            className="font-foglihten text-3xl capitalize text-[#F8F3EA] sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ textShadow: '0 1px 8px rgba(9, 74, 47, 0.55)' }}
          >
            Save The Date
          </h2>
        </div>

        {/* Countdown Timer */}
        <div
          ref={countdownRef}
          className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-6 px-4 text-white"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums">
              {countdown.days}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium text-white/90">Days</div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-gold">:</div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums">
              {countdown.hours}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium text-white/90">Hours</div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-gold">:</div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums">
              {countdown.minutes}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium text-white/90">Minutes</div>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-gold">:</div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums">
              {countdown.seconds}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium text-white/90">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaveTheDateCounter
