import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import ImageLightbox from './ImageLightbox'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const CAROUSEL_CYCLE_MS = 3500

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const pageVisibleRef = useRef(true)

  const ceremony = venuesData.ceremony

  const ceremonyPhoto = '/assets/images/venues/for%20envelopes%20%2817%29.png'

  const venueSlides = [
    { src: ceremonyPhoto, alt: 'Ceremony venue', venue: ceremony },
    { src: '/assets/images/venues/for%20envelopes%20%2819%29.png', alt: 'Venue map', venue: ceremony },
  ]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % venueSlides.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + venueSlides.length) % venueSlides.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    const minSwipe = 50
    if (diff > minSwipe) nextImage()
    else if (diff < -minSwipe) prevImage()
  }

  useEffect(() => {
    if (venueSlides.length <= 1 || carouselPaused || lightboxImage) return undefined

    const id = window.setInterval(() => {
      if (!pageVisibleRef.current) return
      setCurrentIndex((prev) => (prev + 1) % venueSlides.length)
    }, CAROUSEL_CYCLE_MS)

    return () => window.clearInterval(id)
  }, [currentIndex, venueSlides.length, carouselPaused, lightboxImage])

  useEffect(() => {
    const onVisibility = () => {
      pageVisibleRef.current = !document.hidden
    }
    pageVisibleRef.current = !document.hidden
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    // Venue Title animation
    if (venueTitleRef.current) {
      ScrollTrigger.create({
        trigger: venueTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(venueTitleRef.current,
          { opacity: 1, y: 0 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Venue animation - animate image and content
    if (venueRef.current) {
      const venueContainer = venueRef.current
      const venueImage = venueContainer.querySelector('.venue-image-container')
      const venueContent = venueContainer.querySelector('.venue-details-mobile, .venue-details-desktop')
      if (venueImage) {
        gsap.set(venueImage, { opacity: 0, x: -30 })
      }
      if (venueContent) {
        gsap.set(venueContent, { opacity: 0, x: 30 })
      }
      ScrollTrigger.create({
        trigger: venueRef.current,
        start: "top 75%",
        onEnter: () => {
          if (venueImage) {
            gsap.to(venueImage, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
          }
          if (venueContent) {
            gsap.to(venueContent, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 })
          }
        }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === venueTitleRef.current ||
          trigger.vars.trigger === venueRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      {/* Venue Title */}
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text"
          >
            WHERE TO GO
          </span>
        </h3>
      </div>

      {/* Venue Container */}
      <div
        ref={venueRef}
        className="relative overflow-visible"
      >
        <div className="relative overflow-hidden">
          <div className="text-center transition-opacity duration-500 ease-in-out">
            {/* ——— Mobile: Carousel (1 slide) + dynamic location info ——— */}
            <div
              className="md:hidden flex flex-col gap-6 items-center"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              <div className="w-full flex justify-center items-center gap-2">
                <button
                  onClick={prevImage}
                  className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8 text-forest" />
                </button>
                <div
                  className="w-full max-w-[220px] sm:max-w-[240px] aspect-square relative venue-image-container overflow-hidden rounded-full"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {venueSlides.map((slide, index) => (
                      <div
                        key={index}
                        className={`min-w-full aspect-square flex-shrink-0 ${!slide.src ? 'flex items-center justify-center p-4' : ''}`}
                      >
                        {slide.src ? (
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-full object-cover rounded-full cursor-pointer"
                            onClick={() => setLightboxImage({ src: slide.src, alt: slide.alt })}
                          />
                        ) : (
                          <span className="text-center text-sm sm:text-base font-boska text-forest leading-tight px-2">
                            {slide.fallbackText}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {venueSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentIndex ? 'bg-burgundy-wine w-6' : 'bg-white/60'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={nextImage}
                  className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8 text-forest" />
                </button>
              </div>

              {/* Dynamic content: updates with current slide */}
              <div className="venue-details-mobile w-full flex flex-col gap-2 px-2">
                <div className="flex flex-col gap-0.5">
                  <div className="text-lg sm:text-xl font-boska text-center" style={{ color: '#b88917' }}>
                    {venueSlides[currentIndex].venue.name}
                  </div>
                  <div className="text-sm sm:text-base font-albert font-thin text-forest text-center space-y-0">
                    <p>Ceremony & Reception: {ceremony.time} onwards</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <SecondaryButton
                    href={venueSlides[currentIndex].venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={ArrowRight}
                  >
                    Get Direction
                  </SecondaryButton>
                </div>
              </div>
            </div>

            {/* ——— Tablet/Desktop: Swipeable carousel ——— */}
            <div
              className="hidden md:flex venue-details-desktop flex-col gap-6 md:gap-8 w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto items-center"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
            >
              <div className="w-full flex justify-center items-center gap-4">
                <button onClick={prevImage} className="hover:opacity-70" aria-label="Previous image">
                  <ChevronLeft className="w-8 h-8 text-forest" />
                </button>
                <div
                  className="w-full max-w-[300px] md:max-w-[340px] lg:max-w-[380px] xl:max-w-[420px] aspect-square relative venue-image-container overflow-hidden rounded-full flex items-center justify-center bg-white/90 border-2 border-gold/20"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex transition-transform duration-500 ease-in-out h-full w-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {venueSlides.map((slide, index) => (
                      <div key={index} className="min-w-full h-full">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-full object-cover rounded-full cursor-pointer"
                          onClick={() => setLightboxImage({ src: slide.src, alt: slide.alt })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={nextImage} className="hover:opacity-70" aria-label="Next image">
                  <ChevronRight className="w-8 h-8 text-forest" />
                </button>
              </div>
              <div className="flex gap-2">
                {venueSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex ? 'bg-burgundy-wine w-6' : 'bg-black/25'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-boska" style={{ color: '#b88917' }}>
                  {ceremony.name}
                </div>
                <div className="text-sm sm:text-base font-albert font-thin text-forest space-y-1">
                  <p>Ceremony & Reception: {ceremony.time} onwards</p>
                </div>
                <div className="flex justify-center mt-2">
                  <SecondaryButton
                    href={ceremony.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={ArrowRight}
                  >
                    Get Direction
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageLightbox
        isOpen={!!lightboxImage}
        src={lightboxImage?.src}
        alt={lightboxImage?.alt ?? ''}
        onClose={() => setLightboxImage(null)}
      />
    </>
  )
}

export default Venue
