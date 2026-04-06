import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { couple, prenupImages } from '../data'

const Hero = () => {
  const coupleTogetherRef = useRef(null)
  const dateRef = useRef(null)

  const formatDate = () => {
    const { day, year, month } = couple.wedding
    const monthUpper = month.toUpperCase()
    const dayFormatted = String(day).padStart(2, '0')
    return `${monthUpper}.${dayFormatted}.${year}`
  }

  useEffect(() => {
    gsap.set(coupleTogetherRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.3 })

    if (coupleTogetherRef.current) {
      tl.to(coupleTogetherRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
      })
    }

    if (dateRef.current) {
      tl.to(
        dateRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        '-=0.35'
      )
    }
  }, [])

  const heroAlt = couple.together.replace('&', 'and')

  return (
    <div className="relative w-full overflow-hidden bg-forest" style={{ height: '100vh' }}>
      <img
        src={prenupImages.hero}
        alt={heroAlt}
        className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover object-top select-none md:object-[center_22%]"
        fetchPriority="high"
        decoding="async"
        draggable={false}
      />

      <svg
        className="pointer-events-none absolute -bottom-2 left-1/2 z-10 h-[calc(16rem+16px)] w-[calc(100%+24px)] max-w-none -translate-x-1/2 sm:h-[calc(20rem+16px)] md:h-[calc(24rem+16px)] lg:h-[calc(28rem+20px)]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBlurBottom">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(31, 43, 32, 0)" />
            <stop offset="30%" stopColor="rgba(31, 43, 32, 0.38)" />
            <stop offset="60%" stopColor="rgba(31, 43, 32, 0.75)" />
            <stop offset="88%" stopColor="rgba(31, 43, 32, 0.96)" />
            <stop offset="100%" stopColor="rgba(31, 43, 32, 1)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bottomGradient)" filter="url(#heroBlurBottom)" />
      </svg>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-4 pb-10 sm:pb-12 md:px-8 md:pb-14 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p
            ref={coupleTogetherRef}
            className="font-foglihten text-4xl leading-tight text-[#F8F3EA] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.45), 0 0 24px rgba(0,0,0,0.2)' }}
          >
            {couple.together}
          </p>
          <p
            ref={dateRef}
            className="mt-2 font-foglihten text-3xl tracking-wide text-white sm:mt-3 sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 0 18px rgba(0,0,0,0.2)' }}
          >
            {formatDate()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
