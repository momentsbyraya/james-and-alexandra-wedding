import React, { useRef, useEffect, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { couple, prenupImages } from '../data'
import './pages/Details.css'
import {
  createScrollTriggerScope,
  MODAL_OVERLAY_CLASS,
  useGsapForce3D,
} from '../utils/safariCompat'

gsap.registerPlugin(ScrollTrigger)

/** Build editorial rows: full → split → split (alt) → repeat */
function buildGalleryRows(images) {
  const rows = []
  let i = 0
  let splitAlt = 0

  while (i < images.length) {
    rows.push({ kind: 'full', items: [{ src: images[i], index: i }] })
    i += 1
    if (i >= images.length) break

    if (i + 1 < images.length) {
      const spans = splitAlt % 2 === 0 ? [2, 3] : [3, 2]
      rows.push({
        kind: 'split',
        items: [
          { src: images[i], index: i, span: spans[0] },
          { src: images[i + 1], index: i + 1, span: spans[1] },
        ],
      })
      i += 2
      splitAlt += 1
    }
  }

  return rows
}

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const galleryImages = prenupImages.moments ?? prenupImages.gallery
  const galleryThumbObjectPosition = prenupImages.galleryThumbObjectPosition ?? []
  const photoAlt = couple.together.replace('&', 'and')

  const lightboxImages = galleryImages
  const galleryRows = useMemo(() => buildGalleryRows(galleryImages), [galleryImages])

  const imageRefs = useRef([])
  const scrollScope = useMemo(() => createScrollTriggerScope(), [])
  const useForce3D = useGsapForce3D()
  const tileCount = galleryImages.length

  const rowHeightClass =
    'min-h-[11rem] max-h-[220px] sm:min-h-[13rem] sm:max-h-[260px] md:min-h-[15rem] md:max-h-[300px] lg:max-h-[340px]'

  /** Fixed height so object-cover + object-position apply on the full-width hero tile */
  const heroRowHeightClass =
    'h-[11rem] max-h-[220px] sm:h-[13rem] sm:max-h-[260px] md:h-[15rem] md:max-h-[300px] lg:max-h-[340px]'

  const firstGalleryObjectPosition =
    prenupImages.galleryFirstObjectPosition ??
    galleryThumbObjectPosition[0] ??
    'center 52%'

  useEffect(() => {
    if (titleRef.current) {
      scrollScope.add(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          animation: gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          ),
          toggleActions: 'play none none reverse',
        })
      )
    }

    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        const isFromLeft = index % 2 === 0
        const xValue = isFromLeft ? -100 : 100

        gsap.set(ref, {
          opacity: 0,
          x: xValue,
          force3D: useForce3D,
        })

        scrollScope.add(
          ScrollTrigger.create({
            trigger: ref,
            start: 'top 85%',
            animation: gsap.to(ref, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              force3D: useForce3D,
            }),
            toggleActions: 'play none none reverse',
          })
        )
      }
    })

    return () => scrollScope.kill()
  }, [tileCount, scrollScope, useForce3D])

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
    )
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(
          (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
        )
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, lightboxImages.length])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      if (overlayRef.current && contentRef.current) {
        gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
        gsap.set(contentRef.current, { scale: 0.9 })

        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen])

  const renderTile = ({
    refIndex,
    src,
    alt,
    lightboxIndex,
    className,
    objectPosition = 'center center',
    gridColumn,
  }) => (
    <div
      ref={(el) => {
        imageRefs.current[refIndex] = el
      }}
      className={`gallery-tile-animated cursor-pointer overflow-hidden ${className}`}
      style={{
        ...(gridColumn ? { gridColumn: `span ${gridColumn}` } : {}),
        ...(useForce3D
          ? {
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }
          : {}),
      }}
      onClick={() => handleImageClick(lightboxIndex)}
    >
      <img
        src={src}
        alt={alt}
        className="block h-full w-full min-h-0 object-cover transition-transform duration-300 hover:scale-105"
        style={{
          objectPosition,
          objectFit: 'cover',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  )

  return (
    <div ref={sectionRef} className="relative pb-8 sm:pb-12 md:pb-16">
      <div
        className="relative z-20 !py-8 sm:!py-10 bg-forest"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }}
      >
        <div className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
          <h3
            ref={titleRef}
            className="relative inline-block px-6 py-3 text-center w-full"
          >
            <span
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize"
              style={{ color: '#CBCBC0' }}
            >
              Moments
            </span>
          </h3>
        </div>
      </div>

      <div className="w-full py-8 sm:py-12 md:py-16">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          {galleryRows.map((row, rowIndex) => {
            if (row.kind === 'full') {
              const item = row.items[0]
              return (
                <React.Fragment key={`row-${rowIndex}`}>
                  {renderTile({
                    refIndex: item.index,
                    src: item.src,
                    alt: `${photoAlt} — moment ${item.index + 1}`,
                    lightboxIndex: item.index,
                    className: `relative w-full overflow-hidden ${heroRowHeightClass}`,
                    objectPosition:
                      item.index === 0
                        ? firstGalleryObjectPosition
                        : 'center center',
                  })}
                </React.Fragment>
              )
            }

            return (
              <div
                key={`row-${rowIndex}`}
                className={`grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 ${rowHeightClass}`}
              >
                {row.items.map((item) =>
                  renderTile({
                    refIndex: item.index,
                    src: item.src,
                    alt: `${photoAlt} — moment ${item.index + 1}`,
                    lightboxIndex: item.index,
                    className: `h-full min-h-0 ${rowHeightClass}`,
                    gridColumn: item.span,
                    objectPosition:
                      galleryThumbObjectPosition[item.index] ?? 'center center',
                  })
                )}
              </div>
            )
          })}
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div
              ref={overlayRef}
              className={MODAL_OVERLAY_CLASS}
              onClick={closeModal}
            />

            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
              style={{ pointerEvents: 'auto' }}
              aria-label="Close"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
              style={{ pointerEvents: 'auto' }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
              style={{ pointerEvents: 'auto' }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            <div
              ref={contentRef}
              className="relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center"
              style={{ pointerEvents: 'none' }}
            >
              <img
                src={lightboxImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-full object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <span className="font-albert text-sm text-white">
                {currentImageIndex + 1} / {lightboxImages.length}
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default Gallery
