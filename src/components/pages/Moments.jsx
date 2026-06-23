import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ImageBanner from '../ImageBanner'
import { loveStory, prenupImages } from '../../data'
import { MODAL_OVERLAY_CLASS } from '../../utils/safariCompat'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Moments = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const storyRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const galleryGridRef = useRef(null)
  const imageRefs = useRef([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const galleryImages = prenupImages.moments ?? prenupImages.momentsGrid

  const lightboxImages = galleryImages

  useEffect(() => {
    // Set initial hidden states to prevent glimpse
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, scale: 0 })
    }

    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
    }

    // Back button fade-in animation after page slides in
    if (backButtonRef.current) {
      gsap.fromTo(
        backButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.6 }
      )
    }

    // Story paragraph animation on load
    if (storyRef.current) {
      gsap.fromTo(
        storyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 }
      )
    }

    // Scroll-triggered animations for gallery
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Header animation first
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    // Content animation after header
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
    }

    // Second gallery images animations - alternate left and right
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        const isFromLeft = index % 2 === 0
        const xValue = isFromLeft ? -100 : 100

        gsap.set(ref, {
          opacity: 0,
          x: xValue,
          force3D: true
        })

        ScrollTrigger.create({
          trigger: ref,
          start: 'top 85%',
          animation: gsap.to(ref, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            force3D: true
          }),
          toggleActions: 'play none none reverse'
        })
      }
    })

    // Cleanup function
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars &&
          (trigger.vars.trigger === headerRef.current ||
            imageRefs.current.includes(trigger.vars.trigger))
        ) {
          trigger.kill()
        }
      })
    }
  }, [galleryImages.length])

  return (
    <>
      <section
        ref={sectionRef}
        id="moments"
        data-section="moments"
        className="relative w-full overflow-hidden min-h-screen"
        style={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        {/* Image Banner at Top */}
        <ImageBanner
          src={prenupImages.moments?.[0] ?? prenupImages.pool[0]}
          alt="Moments banner"
          title="Love Story"
          subtitle="Our"
        />

        {/* Background Image with reduced opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/images/graphics/calligraphy-bg.png)',
            opacity: 0.15
          }}
        />

        {/* Content */}
        <div className="relative z-20 w-full flex flex-col items-center">
          {/* Our Story Section with White Background */}
          <div className="w-full bg-white py-12 sm:py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-8 sm:px-12 md:px-8 lg:px-16">
              {/* Love Story Paragraph */}
              {loveStory.timeline && loveStory.timeline[0] && (
                <div ref={storyRef} className="relative z-20 w-full">
                  <p
                    className="alice-regular font-black text-[#333333] leading-relaxed text-center"
                    style={{ fontWeight: 900, fontSize: '1rem', lineHeight: '1.8' }}
                  >
                    {loveStory.timeline[0].description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="relative z-20 flex items-center justify-center py-12 w-full">
            {/* White Blur Image - Top (Flipped Vertically) */}
            <div
              className="absolute top-0 flex items-center justify-center"
              style={{ left: 0, width: '100vw', zIndex: 5 }}
            >
              <img
                src="/assets/images/graphics/white-blur.png"
                alt="White blur decoration"
                style={{
                  width: '100vw',
                  height: 'auto',
                  display: 'block',
                  transform: 'scaleY(-1)',
                  transformOrigin: 'center'
                }}
              />
            </div>

            <div className="max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
              {/* Header Section */}
              <div ref={headerRef} className="text-center mb-12">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] font-lavishly italic">
                  Our Moments
                </h2>
              </div>

              <div ref={contentRef} className="w-full">
              {/* Gallery Grid — all moments */}
              <div
                ref={galleryGridRef}
                className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
                style={{ gridAutoRows: '1fr' }}
              >
                {galleryImages.map((image, index) => {
                  // Pattern: 1 full, 2 (1/3 + 2/3), 2 (2/3 + 1/3), 1 full, then 1/3 + 2/3
                  let gridColumn = 'span 1' // default 1/3 width

                  if (index === 0) {
                    gridColumn = 'span 3'
                  } else if (index === 1) {
                    gridColumn = 'span 1'
                  } else if (index === 2) {
                    gridColumn = 'span 2'
                  } else if (index === 3) {
                    gridColumn = 'span 2'
                  } else if (index === 4) {
                    gridColumn = 'span 1'
                  } else if (index === 5) {
                    gridColumn = 'span 3'
                  } else if (index === 6) {
                    gridColumn = 'span 1'
                  } else if (index === 7) {
                    gridColumn = 'span 2'
                  } else if (index === 8) {
                    gridColumn = 'span 2'
                  } else if (index === 9) {
                    gridColumn = 'span 1'
                  } else if (index === 10) {
                    gridColumn = 'span 3'
                  } else if (index === 11) {
                    gridColumn = 'span 1'
                  } else if (index === 12) {
                    gridColumn = 'span 2'
                  } else if (index === 13) {
                    gridColumn = 'span 2'
                  } else if (index === 14) {
                    gridColumn = 'span 1'
                  } else if (index === 15) {
                    gridColumn = 'span 3'
                  } else if (index === 16) {
                    gridColumn = 'span 1'
                  } else if (index === 17) {
                    gridColumn = 'span 2'
                  } else if (index === 18) {
                    gridColumn = 'span 2'
                  } else if (index === 19) {
                    gridColumn = 'span 2'
                  }

                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        imageRefs.current[index] = el
                      }}
                      className="cursor-pointer overflow-hidden gallery-image-container max-h-[180px] sm:max-h-[220px] md:max-h-[280px] lg:max-h-[320px]"
                      style={{
                        gridColumn: gridColumn,
                        height: '100%',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                      }}
                      onClick={() => {
                        setSelectedImage(image)
                        setSelectedImageIndex(index)
                      }}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                        style={{
                          height: '100%',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden'
                        }}
                        loading="lazy"
                      />
                    </div>
                  )
                })}
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button - Circular, Bottom Right */}
      <button
        ref={backButtonRef}
        onClick={() => {
          if (sectionRef.current) {
            gsap.to(sectionRef.current, {
              x: '-100%',
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in',
              onComplete: () => {
                navigate('/')
              }
            })
          } else {
            navigate('/')
          }
        }}
        className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-[#19253e] text-white rounded-full shadow-lg hover:bg-[#19253e]/80 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to home"
        style={{ pointerEvents: 'auto' }}
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      {/* Image Lightbox Modal */}
      {selectedImage &&
        createPortal(
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Dark Overlay */}
            <div
              className={`${MODAL_OVERLAY_CLASS} bg-black/80`}
              onClick={() => {
                setSelectedImage(null)
                setSelectedImageIndex(null)
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedImage(null)
                setSelectedImageIndex(null)
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            {selectedImageIndex !== null && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (selectedImageIndex > 0) {
                    const newIndex = selectedImageIndex - 1
                    setSelectedImageIndex(newIndex)
                    setSelectedImage(lightboxImages[newIndex])
                  }
                }}
                disabled={selectedImageIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                style={{ pointerEvents: 'auto' }}
              >
                <ChevronLeft
                  className="w-10 h-10 text-white"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))' }}
                />
              </button>
            )}

            {/* Next Button */}
            {selectedImageIndex !== null && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (selectedImageIndex < lightboxImages.length - 1) {
                    const newIndex = selectedImageIndex + 1
                    setSelectedImageIndex(newIndex)
                    setSelectedImage(lightboxImages[newIndex])
                  }
                }}
                disabled={selectedImageIndex === lightboxImages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                style={{ pointerEvents: 'auto' }}
              >
                <ChevronRight
                  className="w-10 h-10 text-white"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))' }}
                />
              </button>
            )}

            {/* Image */}
            <div className="relative z-10 max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Full size image"
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Moments
