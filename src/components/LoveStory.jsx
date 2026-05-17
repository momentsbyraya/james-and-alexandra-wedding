import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { loveStory, prenupImages } from '../data'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

/** Expand timeline/chapters into alternating story rows (splits `\n\n` in descriptions). */
function buildStoryRows(storyData, images) {
  const source =
    Array.isArray(storyData.timeline) && storyData.timeline.length > 0
      ? storyData.timeline
      : (storyData.chapters || []).map((c) => ({
          title: c.title,
          description: c.text,
        }))

  const textRows = []

  source.forEach((item) => {
    const desc = (item.description || item.text || '').trim()
    const parts = desc.split(/\n\n/).map((p) => p.trim()).filter(Boolean)
    if (parts.length === 0) return
    if (parts.length === 1) {
      textRows.push({ text: parts[0], title: item.title || null })
    } else {
      parts.forEach((part, i) => {
        textRows.push({
          text: part,
          title: i === 0 ? item.title || null : null,
        })
      })
    }
  })

  if (textRows.length === 0 && storyData.content) {
    storyData.content
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean)
      .forEach((text) => textRows.push({ text, title: null }))
  }

  return textRows.map((row, i) => ({
    ...row,
    image: images[i % images.length],
  }))
}

const LoveStory = () => {
  const titleRef = useRef(null)
  const storySectionRef = useRef(null)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const polaroidPool = prenupImages.loveStory
  const storyRows = useMemo(
    () => buildStoryRows(loveStory, polaroidPool),
    [polaroidPool]
  )
  const polaroidImages = useMemo(() => storyRows.map((r) => r.image), [storyRows])

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

    return () => trigger.kill()
  }, [])

  useEffect(() => {
    const createdTriggers = []
    const storyItems = storySectionRef.current?.querySelectorAll('.story-item')

    storyItems?.forEach((item, index) => {
      const polaroidWrapper = item.querySelector('.love-story-polaroid')
      const textParagraph = item.querySelector('p.font-albert')
      gsap.set(item, { opacity: 0, y: 28 })
      if (polaroidWrapper) gsap.set(polaroidWrapper, { scale: 0.92 })
      if (textParagraph) gsap.set(textParagraph, { opacity: 0, y: 16 })

      createdTriggers.push(
        ScrollTrigger.create({
          trigger: item,
          start: 'top 82%',
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              delay: index * 0.1,
            })
            if (polaroidWrapper) {
              gsap.to(polaroidWrapper, {
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.2)',
                delay: index * 0.1 + 0.15,
              })
            }
            if (textParagraph) {
              gsap.to(textParagraph, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                delay: index * 0.1 + 0.25,
              })
            }
          },
          toggleActions: 'play none none reverse',
        })
      )
    })

    return () => {
      createdTriggers.forEach((t) => t.kill())
    }
  }, [storyRows.length])

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      return undefined
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    gsap.to(contentRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })

    const onKey = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)
      }
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen, polaroidImages.length])

  const formatParagraph = (text) => {
    const quote = '"I found him whom my soul loveth" – Song of Solomon 3:4'
    if (!text.includes(quote)) return text
    const parts = text.split(quote)
    const out = []
    parts.forEach((part, i) => {
      out.push(part)
      if (i < parts.length - 1) {
        out.push(
          <span key={`q-${i}`} className="font-bold italic">
            {quote}
          </span>
        )
      }
    })
    return out
  }

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % polaroidImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + polaroidImages.length) % polaroidImages.length)
  }

  const Polaroid = ({ image, rotation = 0, index }) => {
    return (
      <button
        type="button"
        className="love-story-polaroid bg-white shadow-lg relative cursor-pointer block w-full max-w-[96px] sm:max-w-[140px] md:max-w-[180px] lg:max-w-[200px]"
        style={{
          border: '4px solid white',
          borderBottom: '12px solid white',
          transform: `rotate(${rotation}deg)`,
          padding: '2px 2px 8px 2px',
        }}
        onClick={() => handleImageClick(index)}
        aria-label={`View love story photo ${index + 1}`}
      >
        <div className="relative">
          <img
            src={image}
            alt={`Love story moment ${index + 1}`}
            className="w-full aspect-square object-cover pointer-events-none"
            style={{
              border: '2px solid #CBCBC0',
              borderBottom: 'none',
              display: 'block',
            }}
          />
          <img
            src="/assets/images/graphics/stamp.png"
            alt=""
            className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
            style={{
              top: '-8%',
              width: '20%',
              height: 'auto',
            }}
          />
        </div>
      </button>
    )
  }

  return (
    <div className="relative pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-12 md:pb-14">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="flex justify-center mb-2 sm:mb-3">
          <img
            src="/assets/images/graphics/heart.png"
            alt=""
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain"
          />
        </div>
        <h3 ref={titleRef} className="relative inline-block px-4 py-1 sm:py-1.5">
          <span className="love-story-title love-story-title--section text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-tight">
            {loveStory.title}
          </span>
        </h3>
      </div>

      <div ref={storySectionRef} className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative z-10 flex flex-col gap-12 sm:gap-16 md:gap-20">
            {storyRows.map((row, index) => {
              const photoLeft = index % 2 === 0
              const image = polaroidImages[index]

              return (
                <div
                  key={index}
                  className={`story-item grid w-full gap-3 sm:gap-6 md:gap-8 items-center min-h-0 ${
                    photoLeft
                      ? 'grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'
                      : 'grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'
                  }`}
                >
                  {photoLeft ? (
                    <>
                      <div className="flex justify-center items-center min-w-0">
                        {image && (
                          <Polaroid image={image} rotation={-3} index={index} />
                        )}
                      </div>
                      <div className="flex flex-col justify-center min-w-0 gap-2">
                        {row.title ? (
                          <h4 className="font-boska text-xs sm:text-base md:text-lg text-forest leading-snug text-left">
                            {row.title}
                          </h4>
                        ) : null}
                        <p className="text-[11px] sm:text-sm md:text-base font-albert font-thin leading-relaxed text-forest text-left w-full min-w-0">
                          {formatParagraph(row.text)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col justify-center min-w-0 gap-2">
                        {row.title ? (
                          <h4 className="font-boska text-xs sm:text-base md:text-lg text-forest leading-snug text-right">
                            {row.title}
                          </h4>
                        ) : null}
                        <p className="text-[11px] sm:text-sm md:text-base font-albert font-thin leading-relaxed text-forest text-right w-full min-w-0">
                          {formatParagraph(row.text)}
                        </p>
                      </div>
                      <div className="flex justify-center items-center min-w-0">
                        {image && (
                          <Polaroid image={image} rotation={3} index={index} />
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed inset-0 z-[10050] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Love story photo"
          >
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div
              ref={contentRef}
              className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none"
            >
              <img
                src={polaroidImages[currentImageIndex]}
                alt={`Love story image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-white text-sm font-albert">
                {currentImageIndex + 1} / {polaroidImages.length}
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default LoveStory
