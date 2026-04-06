import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { loveStory, prenupImages } from '../data'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const titleRef = useRef(null)
  const modalInnerRef = useRef(null)
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const [storyModalOpen, setStoryModalOpen] = useState(false)
  const [teaserIndex, setTeaserIndex] = useState(0)

  const paragraphs = loveStory.content.split('\n\n').filter((p) => p.trim())
  const summaryText =
    'From schoolmates to workmates, food and travel buddies, and now proud furr parents.'

  const polaroidImages = prenupImages.loveStory

  const TEASER_SLIDE_MS = 4500

  useEffect(() => {
    setTeaserIndex(0)
  }, [polaroidImages.length])

  useEffect(() => {
    if (polaroidImages.length <= 1 || storyModalOpen) return undefined
    const id = setInterval(() => {
      setTeaserIndex((i) => (i + 1) % polaroidImages.length)
    }, TEASER_SLIDE_MS)
    return () => clearInterval(id)
  }, [polaroidImages.length, storyModalOpen])

  /** Summary polaroid thread (charcoal on page background) */
  const loveThreadColor = '#4B4B4B'
  /** Modal thread connectors — light on dark panel */
  const modalThreadColor = 'rgba(255,255,255,0.45)'

  useEffect(() => {
    if (!titleRef.current) return undefined

    const trigger = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 80%',
      animation: gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      ),
      toggleActions: 'play none none reverse',
    })

    return () => {
      trigger.kill()
    }
  }, [])

  useEffect(() => {
    if (!storyModalOpen) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      return undefined
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    gsap.set([overlayRef.current, panelRef.current], { opacity: 0 })
    gsap.set(panelRef.current, { y: 16 })
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    gsap.to(panelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })

    const onKey = (e) => {
      if (e.key === 'Escape') setStoryModalOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [storyModalOpen])

  useEffect(() => {
    if (!storyModalOpen || !modalInnerRef.current) return undefined

    const items = modalInnerRef.current.querySelectorAll('.story-item')
    if (!items.length) return undefined

    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power2.out',
        delay: 0.12,
      }
    )

    return () => {
      gsap.killTweensOf(items)
    }
  }, [storyModalOpen])

  const formatParagraph = (text) => {
    const quotePattern = /("I found him whom my soul loveth" – Song of Solomon 3:4)/
    const parts = text.split(quotePattern)

    return parts.map((part, i) => {
      if (quotePattern.test(part)) {
        return (
          <span key={i} className="font-bold italic">
            {part}
          </span>
        )
      }
      return part
    })
  }

  const Polaroid = ({
    image,
    rotation = 0,
    index,
    size = 'normal',
    footer = null,
    slideshowImages = null,
    slideshowIndex = 0,
  }) => {
    const widthClass =
      size === 'solo'
        ? 'max-w-[140px]'
        : size === 'small'
          ? 'max-w-[150px]'
          : 'max-w-[200px]'

    /** Max photo area ~ same polaroid footprint as before (3:4 of width); image fits inside with object-contain */
    const photoMax =
      size === 'solo'
        ? { w: 132, h: 176 }
        : size === 'small'
          ? { w: 142, h: 190 }
          : { w: 192, h: 256 }

    const frameStyle = footer
      ? {
          border: '4px solid white',
          transform: `rotate(${rotation}deg)`,
          padding: '2px',
        }
      : {
          border: '4px solid white',
          borderBottom: '14px solid white',
          transform: `rotate(${rotation}deg)`,
          padding: '2px 2px 10px 2px',
        }

    return (
      <div
        className={`love-story-polaroid bg-white relative w-full shrink-0 ${widthClass}`}
        style={frameStyle}
      >
        {/* Stamp sits above photo top (legacy: top -8%, 20% width); keep image clipped, stamp outside clip */}
        <div className="relative w-full">
          <div
            className="relative w-full overflow-hidden rounded-[1px] bg-[#e8e8e1]"
            style={
              Array.isArray(slideshowImages) && slideshowImages.length > 1
                ? { height: photoMax.h, minHeight: photoMax.h }
                : { minHeight: '72px', maxHeight: photoMax.h }
            }
          >
            {Array.isArray(slideshowImages) && slideshowImages.length > 1 ? (
              slideshowImages.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt={
                    i === slideshowIndex
                      ? `Love story preview, photo ${i + 1} of ${slideshowImages.length}`
                      : ''
                  }
                  aria-hidden={i !== slideshowIndex}
                  className={`love-story-teaser-slide pointer-events-none absolute left-1/2 top-1/2 z-0 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain ${
                    i === slideshowIndex ? 'z-[1] opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    maxWidth: photoMax.w,
                    maxHeight: photoMax.h,
                    border: '2px solid #CBCBC0',
                    borderBottom: 'none',
                  }}
                />
              ))
            ) : (
              <div
                className="flex h-full min-h-[72px] w-full max-h-full items-center justify-center"
                style={{ maxHeight: photoMax.h }}
              >
                <img
                  src={image}
                  alt={`Love story moment ${index + 1}`}
                  className="mx-auto block h-auto w-auto max-w-full object-contain align-top"
                  style={{
                    maxWidth: photoMax.w,
                    maxHeight: photoMax.h,
                    border: '2px solid #CBCBC0',
                    borderBottom: 'none',
                  }}
                />
              </div>
            )}
          </div>
          <img
            src="/assets/images/graphics/stamp.png"
            alt=""
            className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 transform"
            style={{
              top: '-8%',
              width: '20%',
              height: 'auto',
            }}
          />
        </div>
        {footer ? (
          <div className="border-t border-[#CBCBC0]/40 bg-white px-2 py-2.5 sm:py-3 flex justify-center items-center min-h-[3rem]">
            {footer}
          </div>
        ) : null}
      </div>
    )
  }

  /** Dashed S-thread + pin dot (same stroke/dash as between-segment connectors) */
  const ThreadHanger = ({ className = '' }) => (
    <svg
      className={className}
      viewBox="0 0 100 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M 52 2 Q 28 38 46 68 Q 64 98 50 124"
        stroke={loveThreadColor}
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="4 4"
        opacity="0.72"
      />
      <circle cx="50" cy="126" r="3.25" fill={loveThreadColor} opacity="0.78" />
    </svg>
  )

  const storySegments = paragraphs.map((paragraph, i) => ({
    paragraph,
    index: i,
    imageCount: polaroidImages[i] ? 1 : 0,
    imageIndices: polaroidImages[i] ? [i] : [],
  }))

  const closeModal = () => {
    if (overlayRef.current && panelRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
      gsap
        .to(panelRef.current, { opacity: 0, y: 16, duration: 0.2, ease: 'power2.out' })
        .then(() => setStoryModalOpen(false))
    } else {
      setStoryModalOpen(false)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeModal()
  }

  return (
    <div className="relative pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
      <div className="text-center mb-12 sm:mb-16">
        <div className="flex justify-center mb-4">
          <img
            src="/assets/images/graphics/heart.png"
            alt="Heart decoration"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <h3 ref={titleRef} className="relative inline-block px-6 py-3">
          <span className="love-story-title love-story-title--section text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-tight">
            {loveStory.title}
          </span>
        </h3>
        <p className="text-base sm:text-lg font-albert font-thin text-forest leading-relaxed text-center max-w-3xl mx-auto mt-3">
          {summaryText}
        </p>

        {/* Thread + polaroid; CTA sits on polaroid caption strip */}
        {polaroidImages[0] ? (
          <div className="relative mx-auto mt-10 w-full max-w-[220px] sm:max-w-[240px] px-2">
            <ThreadHanger className="pointer-events-none absolute left-1/2 top-0 z-0 h-[9.5rem] w-[5.5rem] max-w-[30%] -translate-x-1/2 -translate-y-1 sm:h-[10.5rem] sm:w-24" />
            <div className="relative z-10 flex flex-col items-center pt-12 sm:pt-14">
              <span className="sr-only" aria-live="polite">
                Story photo {teaserIndex + 1} of {polaroidImages.length}
              </span>
              <Polaroid
                image={polaroidImages[teaserIndex]}
                slideshowImages={
                  polaroidImages.length > 1 ? polaroidImages : null
                }
                slideshowIndex={teaserIndex}
                rotation={-4}
                index={teaserIndex}
                size="normal"
                footer={
                  <button
                    type="button"
                    onClick={() => setStoryModalOpen(true)}
                    className="w-full max-w-[11.5rem] rounded-full bg-forest px-3 py-2 text-center font-albert text-xs sm:text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-gold hover:text-forest"
                  >
                    Read full story
                  </button>
                }
              />
              {polaroidImages.length > 1 && (
                <div
                  className="mt-3 flex justify-center gap-1.5"
                  aria-hidden
                >
                  {polaroidImages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        i === teaserIndex ? 'bg-forest' : 'bg-forest/25'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setStoryModalOpen(true)}
              className="px-5 py-2 rounded-full bg-forest text-white hover:bg-gold hover:text-forest transition-colors duration-200 font-albert text-sm sm:text-base"
            >
              Read full story
            </button>
          </div>
        )}
      </div>

      {storyModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[10050] flex items-end sm:items-center justify-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="love-story-modal-title"
          >
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
              onClick={handleOverlayClick}
              aria-hidden
            />
            <div
              ref={panelRef}
              className="love-story-modal-panel relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl shadow-2xl sm:max-h-[85vh] sm:rounded-2xl border border-gold/30"
            >
              <div className="love-story-modal-banner relative shrink-0 border-b border-[#dbcf9f]/25 px-4 py-4 sm:px-5 sm:py-5">
                <h2
                  id="love-story-modal-title"
                  className="love-story-title text-center text-lg leading-tight sm:text-xl md:text-2xl"
                >
                  {loveStory.title}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-[#dbcf9f] transition-colors hover:bg-black/20 hover:text-[#f0e8c8] sm:right-3"
                  aria-label="Close story"
                >
                  <X className="h-6 w-6" strokeWidth={1.75} />
                </button>
              </div>
              <div
                className="love-story-modal-banner shrink-0 border-b border-[#dbcf9f]/20 px-2 py-1"
                aria-hidden
              >
                <svg
                  className="h-3 w-full"
                  viewBox="0 0 480 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 7 Q120 2 240 7 T480 7"
                    fill="none"
                    stroke="rgba(219,207,159,0.4)"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeDasharray="4 5"
                  />
                </svg>
              </div>
              <div
                ref={modalInnerRef}
                className="love-story-modal love-story-modal-body min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 text-white sm:px-6 sm:py-8"
              >
                <div className="relative z-10 space-y-12 sm:space-y-16 md:space-y-20">
                  {storySegments.map(({ paragraph, index, imageCount, imageIndices }) => {
                    const isLast = index === paragraphs.length - 1

                    return (
                      <div key={index} className="story-item relative">
                        {!isLast && (
                          <div
                            className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none hidden sm:block"
                            style={{
                              bottom: '-2.25rem',
                              width: '100px',
                              height: '4.5rem',
                              zIndex: 0,
                            }}
                          >
                            <svg
                              width="100"
                              height="100%"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0"
                              style={{ overflow: 'visible' }}
                            >
                              <path
                                d="M 50 0 Q 32 22, 50 45 T 50 100"
                                stroke={modalThreadColor}
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="4,4"
                                strokeLinecap="round"
                              />
                            </svg>
                            <div
                              className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 transform rounded-full bg-white/50"
                            />
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                          {imageCount > 0 && (
                            <div
                              className={`flex justify-center flex-1 min-w-0 ${
                                imageCount === 2
                                  ? 'flex-row flex-nowrap gap-2 sm:gap-6'
                                  : 'flex-row'
                              }`}
                            >
                              {imageIndices.map((imgIdx, i) =>
                                polaroidImages[imgIdx] ? (
                                  <Polaroid
                                    key={imgIdx}
                                    image={polaroidImages[imgIdx]}
                                    rotation={imageCount === 1 ? -4 : i === 0 ? -5 : 5}
                                    index={imgIdx}
                                    size={imageCount === 1 ? 'solo' : 'normal'}
                                  />
                                ) : null
                              )}
                            </div>
                          )}
                          {paragraph && (
                            <div
                              className={`text-center sm:text-left ${imageCount > 0 ? 'flex-1' : 'w-full'}`}
                            >
                              <p className="text-base font-albert font-thin leading-relaxed text-white sm:text-lg">
                                {formatParagraph(paragraph)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default LoveStory
