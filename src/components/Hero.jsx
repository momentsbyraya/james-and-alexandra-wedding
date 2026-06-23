import React, { useState, useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { couple, venues, prenupImages } from '../data'
import { getTimeUntilWedding } from '../utils/countdown'
import { scheduleGsapRevealFallback, shouldUseSafariLiteMode } from '../utils/safariCompat'

const Hero = () => {
  const [countdown, setCountdown] = useState(() => getTimeUntilWedding())

  const invitationTextRef = useRef(null)
  const coupleNamesRef = useRef(null)
  const dateRef = useRef(null)
  const countdownDaysRef = useRef(null)
  const countdownHoursRef = useRef(null)
  const countdownMinutesRef = useRef(null)
  const countdownSecondsRef = useRef(null)
  const heroImgRef = useRef(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    return {
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      month: date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
      day: day.toString().padStart(2, '0'),
      year: date.getFullYear().toString(),
    }
  }

  const dateInfo = useMemo(() => formatDate(couple.wedding.date), [couple.wedding.date])
  const heroGroomName = couple.groom.firstName
  const heroBrideName = couple.bride.firstName
  const venue = venues.ceremony
  const safariLite = shouldUseSafariLiteMode()
  const heroSvgFilter = safariLite ? undefined : 'url(#heroTopBlurFilter)'
  const heroBottomSvgFilter = safariLite ? undefined : 'url(#heroBottomBlurFilter)'

  useEffect(() => {
    heroImgRef.current?.setAttribute('fetchpriority', 'high')
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const animatedRefs = [
      invitationTextRef,
      coupleNamesRef,
      dateRef,
      countdownDaysRef,
      countdownHoursRef,
      countdownMinutesRef,
      countdownSecondsRef,
    ].map((r) => r.current)

    if (invitationTextRef.current) gsap.set(invitationTextRef.current, { opacity: 0, y: 20 })
    if (coupleNamesRef.current) gsap.set(coupleNamesRef.current, { opacity: 0, y: 30 })
    if (dateRef.current) gsap.set(dateRef.current, { opacity: 0, y: 20 })
    if (countdownDaysRef.current) gsap.set(countdownDaysRef.current, { opacity: 0, y: 20 })
    if (countdownHoursRef.current) gsap.set(countdownHoursRef.current, { opacity: 0, y: 20 })
    if (countdownMinutesRef.current) gsap.set(countdownMinutesRef.current, { opacity: 0, y: 20 })
    if (countdownSecondsRef.current) gsap.set(countdownSecondsRef.current, { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.3 })

    if (invitationTextRef.current) {
      tl.to(invitationTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    if (coupleNamesRef.current) {
      tl.to(coupleNamesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    if (countdownDaysRef.current) {
      tl.to(countdownDaysRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    if (countdownHoursRef.current) {
      tl.to(countdownHoursRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    if (countdownMinutesRef.current) {
      tl.to(countdownMinutesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
    if (countdownSecondsRef.current) {
      tl.to(countdownSecondsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const cancelFallback = scheduleGsapRevealFallback(animatedRefs, { delayMs: 3000 })

    return () => {
      tl.kill()
      cancelFallback()
    }
  }, [])

  const heroAlt = couple.together.replace('&', 'and')

  const heroInk = '#094a2f'
  const heroLabelLight = '#F8F3EA'
  const heroLabelShadow =
    '0 1px 3px rgba(9, 74, 47, 0.45), 0 0 12px rgba(9, 74, 47, 0.25)'
  const heroContrastShadow =
    '0 1px 0 rgba(255, 251, 248, 0.75), 0 1px 10px rgba(248, 243, 234, 0.9)'

  const countdownBoxStyle = {
    color: heroInk,
    backgroundColor: 'rgba(248, 243, 234, 0.65)',
    borderRadius: '8px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85), 0 1px 4px rgba(9,74,47,0.15)',
  }

  return (
    <div
      data-hero-section="true"
      className="hero-viewport-height relative w-full overflow-x-hidden overflow-y-hidden"
    >
      <img
        ref={heroImgRef}
        src={prenupImages.hero}
        alt={heroAlt}
        className="h-full w-full object-cover"
        style={{ objectPosition: 'center 38%' }}
        decoding="async"
        draggable={false}
      />

      <svg
        className="pointer-events-none absolute left-0 top-0 z-10 h-64 w-full sm:h-80 md:h-96 lg:h-[28rem]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroTopBlurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="heroTopCreamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(248, 243, 234, 0.94)" />
            <stop offset="40%" stopColor="rgba(248, 243, 234, 0.82)" />
            <stop offset="68%" stopColor="rgba(203, 203, 192, 0.48)" />
            <stop offset="100%" stopColor="rgba(248, 243, 234, 0)" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#heroTopCreamGrad)"
          className="hero-svg-blur-rect"
          filter={heroSvgFilter}
        />
      </svg>

      <div className="absolute left-0 right-0 top-0 z-20 px-4 pt-12 sm:px-6 sm:pt-16 md:px-8 md:pt-20 lg-custom:px-2 lg-custom:pt-8 lg:pt-12">
        <div className="mx-auto max-w-4xl text-center">
          <p
            ref={invitationTextRef}
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-forest sm:mb-3 sm:text-sm md:mb-4 md:text-base lg:text-lg"
            style={{
              fontFamily: 'Albert Sans, sans-serif',
              textShadow: heroContrastShadow,
            }}
          >
            YOU ARE INVITED TO
            <br />
            THE WEDDING OF
          </p>
          <div
            ref={coupleNamesRef}
            className="mx-auto mb-3 mt-4 flex max-w-full flex-col items-center px-2 text-center sm:mb-4 sm:mt-5 md:mb-6 md:mt-6 lg:mb-8 lg:mt-8"
            style={{
              fontFamily: 'Pinyon Script, cursive',
              color: heroInk,
              textShadow: heroContrastShadow,
            }}
          >
            <span className="text-5xl leading-none sm:text-6xl md:text-7xl lg:text-8xl lg-custom:text-[clamp(2.75rem,9vw,4.25rem)] xl:text-[clamp(3.5rem,10vw,8rem)]">
              {heroGroomName}
            </span>
            <span className="my-1 text-3xl leading-none sm:my-1.5 sm:text-4xl md:text-5xl lg:text-6xl lg-custom:text-[clamp(1.75rem,5vw,2.5rem)]">
              &
            </span>
            <span className="text-5xl leading-none sm:text-6xl md:text-7xl lg:text-8xl lg-custom:text-[clamp(2.75rem,9vw,4.25rem)] xl:text-[clamp(3.5rem,10vw,8rem)]">
              {heroBrideName}
            </span>
          </div>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute bottom-[-1rem] left-0 z-10 h-64 w-full sm:h-80 md:h-96 lg:h-[28rem]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBottomBlurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="heroBottomForestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(9, 74, 47, 0)" />
            <stop offset="32%" stopColor="rgba(9, 74, 47, 0.52)" />
            <stop offset="62%" stopColor="rgba(9, 74, 47, 0.85)" />
            <stop offset="100%" stopColor="rgba(5, 45, 28, 0.92)" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#heroBottomForestGrad)"
          className="hero-svg-blur-rect"
          filter={heroBottomSvgFilter}
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-8 sm:px-6 sm:pb-12 md:px-8 md:pb-16 lg:pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <div ref={dateRef}>
            <div
              className="mb-2 text-center text-base tracking-wider sm:mb-3 sm:text-lg md:text-xl lg-custom:mb-2 lg-custom:text-base"
              style={{ color: '#FFFFFF', fontFamily: 'Alice, serif', fontWeight: 'bold' }}
            >
              {dateInfo.month}
            </div>
            <div className="mx-auto flex max-w-md items-center justify-center gap-4 sm:gap-6 md:gap-8 lg-custom:gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="mb-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
                <div
                  className="mb-1 mt-1 text-sm tracking-wider sm:text-base md:text-lg lg-custom:text-sm"
                  style={{ color: '#FFFFFF', fontFamily: 'Alice, serif', fontWeight: 'bold' }}
                >
                  {dateInfo.dayOfWeek}
                </div>
                <div
                  className="mt-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
              </div>
              <div
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg-custom:text-5xl"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Alice, serif',
                  fontWeight: 'bold',
                  textShadow:
                    '0 0 10px rgba(170, 141, 90, 0.8), 0 0 20px rgba(170, 141, 90, 0.5), 0 0 30px rgba(170, 141, 90, 0.35)',
                }}
              >
                {dateInfo.day}
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="mb-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
                <div
                  className="mb-1 mt-1 text-sm tracking-wider sm:text-base md:text-lg lg-custom:text-sm"
                  style={{ color: '#FFFFFF', fontFamily: 'Alice, serif', fontWeight: 'bold' }}
                >
                  {(venue.time || couple.wedding.time || '').replace(/\s/g, '').toUpperCase()}
                </div>
                <div
                  className="mt-0 h-px w-16 sm:w-20 md:w-24 lg:w-28 lg-custom:w-16"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-2 sm:mt-10 sm:space-x-3 md:mt-12 md:space-x-4 lg:mt-16 lg-custom:mt-4 lg-custom:space-x-1 xl:mt-20">
            <div ref={countdownDaysRef} className="text-center">
              <div
                className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24 lg-custom:h-16 lg-custom:w-16"
                style={countdownBoxStyle}
              >
                <div className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg-custom:text-xl xl:text-xl">
                  {countdown.days}
                </div>
              </div>
              <div
                className="mt-2 text-[10px] font-albert font-medium sm:text-xs lg-custom:text-[10px]"
                style={{ color: heroLabelLight, textShadow: heroLabelShadow }}
              >
                Days
              </div>
            </div>
            <div
              className="text-xl font-albert font-semibold sm:text-2xl md:text-3xl lg-custom:text-base"
              style={{ color: heroLabelLight, textShadow: heroLabelShadow }}
            >
              :
            </div>
            <div ref={countdownHoursRef} className="text-center">
              <div
                className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24 lg-custom:h-16 lg-custom:w-16"
                style={countdownBoxStyle}
              >
                <div className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg-custom:text-xl xl:text-xl">
                  {countdown.hours}
                </div>
              </div>
              <div
                className="mt-2 text-[10px] font-albert font-medium sm:text-xs lg-custom:text-[10px]"
                style={{ color: heroLabelLight, textShadow: heroLabelShadow }}
              >
                Hours
              </div>
            </div>
            <div
              className="text-xl font-albert font-semibold sm:text-2xl md:text-3xl lg-custom:text-base"
              style={{ color: heroLabelLight, textShadow: heroLabelShadow }}
            >
              :
            </div>
            <div ref={countdownMinutesRef} className="text-center">
              <div
                className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24 lg-custom:h-16 lg-custom:w-16"
                style={countdownBoxStyle}
              >
                <div className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg-custom:text-xl xl:text-xl">
                  {countdown.minutes}
                </div>
              </div>
              <div
                className="mt-2 text-[10px] font-albert font-medium sm:text-xs lg-custom:text-[10px]"
                style={{ color: heroLabelLight, textShadow: heroLabelShadow }}
              >
                Minutes
              </div>
            </div>
            <div
              className="text-xl font-albert font-semibold sm:text-2xl md:text-3xl lg-custom:text-base"
              style={{ color: heroLabelLight, textShadow: heroLabelShadow }}
            >
              :
            </div>
            <div ref={countdownSecondsRef} className="text-center">
              <div
                className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24 lg-custom:h-16 lg-custom:w-16"
                style={countdownBoxStyle}
              >
                <div className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg-custom:text-xl xl:text-xl">
                  {countdown.seconds}
                </div>
              </div>
              <div
                className="mt-2 text-[10px] font-albert font-medium sm:text-xs lg-custom:text-[10px]"
                style={{ color: heroLabelLight, textShadow: heroLabelShadow }}
              >
                Seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
