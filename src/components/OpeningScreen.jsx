import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { prenupImages } from '../data/prenupImages'

const openingBg = prenupImages.openingScreenBackgrounds

function OpeningScreen({ onEnvelopeOpen }) {
  const envelopeRef = useRef(null)
  const openingSectionRef = useRef(null)
  const clickMeRef = useRef(null)
  const coupleNameRef = useRef(null)
  const stampRef = useRef(null)

  // Animate text and envelope on mount
  useEffect(() => {
    // Set initial hidden states
    if (clickMeRef.current) gsap.set(clickMeRef.current, { opacity: 0, y: -30 })
    if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, scale: 0.8 })
    if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })

    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.3 })

    // Animate "Click me!" text - fade in and slide down
    if (clickMeRef.current) {
      tl.to(clickMeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
    }

    // Animate envelope - fade in, scale up with bounce
    if (envelopeRef.current) {
      tl.to(envelopeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.4")
    }

    // Animate couple name and date - fade in and slide up
    if (coupleNameRef.current) {
      tl.to(coupleNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
    }

    if (stampRef.current) {
      gsap.to(stampRef.current, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1
      })
    }
  }, [])

  const handleEnvelopeClick = () => {
    const envelope = envelopeRef.current
    const openingSection = openingSectionRef.current
    
    if (envelope) {
      envelope.classList.add('active')
      // Letter translation: 0.3s delay + 0.8s duration = 1.1s total
      // Wait 1 second after letter finishes translating
      setTimeout(() => {
        if (openingSection) {
          openingSection.classList.add('zooming-out')
          // After zoom and fadeout animation completes, reveal invitation
          setTimeout(() => {
            if (onEnvelopeOpen) {
              onEnvelopeOpen()
            }
          }, 1500) // Animation duration
        }
      }, 2100) // 1.1s (letter animation) + 1000ms (1 second wait)
    }
  }

  return (
    <div 
      ref={openingSectionRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center opening-section"
    >
      <div className="absolute inset-0 flex min-h-0 flex-col">
        {openingBg.map((src, i) => (
          <div
            key={src}
            className="relative min-h-0 flex-1 basis-0 overflow-hidden"
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale"
              style={{
                objectPosition: i === 2 ? 'center 45%' : 'center 20%',
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/20 z-[1]" />
      <section className="cssletter flex flex-col items-center relative z-10 w-full py-8" style={{ minHeight: 'auto', height: 'auto' }}>
        <div ref={clickMeRef} className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center click-me-container">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-foglihten uppercase leading-tight" style={{ color: '#EDEDDD' }}>
            YOU ARE GRACIOUSLY
          </p>
          <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-tight" style={{ fontFamily: 'Pinyon Script, cursive', color: '#F5F5DC' }}>
            Invited
          </p>
        </div>
        <div className="envelope" ref={envelopeRef}>
          <button 
            className="heart stamp-button" 
            id="openEnvelope" 
            aria-label="Open Envelope"
            onClick={handleEnvelopeClick}
          >
            <img 
              ref={stampRef}
              src="/assets/images/graphics/stamp.png" 
              alt="Stamp" 
              className="stamp-image"
              onError={(e) => {
                // Hide stamp if image doesn't exist
                e.target.style.display = 'none'
              }}
            />
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
          {/* Letter that slides up when envelope opens */}
          <div className="envelope-letter envelope-letter-centered">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold">You are invited!</p>
            <img 
              src="/assets/images/graphics/cutlery-sketch.png" 
              alt="Cutlery sketch" 
              className="mt-4 w-20 sm:w-24 md:w-28 h-auto mx-auto"
              onError={(e) => {
                // Use ring-sketch as fallback if cutlery-sketch doesn't exist
                e.target.src = '/assets/images/graphics/ring-sketch.png'
              }}
            />
          </div>
        </div>
        <div ref={coupleNameRef} className="mt-4 sm:mt-6 md:mt-8 text-center couple-name-container">
          <p 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-foglihten uppercase leading-tight"
            style={{ 
              color: '#F8F3EA',
              fontSize: 'clamp(1.5rem, 4vw, 48px)',
              textShadow: 'none',
              cursor: 'pointer'
            }}
            onClick={handleEnvelopeClick}
          >
            CLICK TO OPEN
          </p>
        </div>
      </section>
    </div>
  )
}

export default OpeningScreen
