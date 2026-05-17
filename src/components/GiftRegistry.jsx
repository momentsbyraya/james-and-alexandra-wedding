import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import { weddingConfig } from '../config/weddingConfig'

const GiftRegistry = ({ compact = false }) => {
  const { paymentMethods = [] } = paymentMethodsData
  const slides = paymentMethods.filter((m) => m.image)

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isLightboxOpen = lightboxIndex !== null

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null || slides.length === 0 ? null : (i - 1 + slides.length) % slides.length))
  }, [slides.length])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null || slides.length === 0 ? null : (i + 1) % slides.length))
  }, [slides.length])

  useEffect(() => {
    if (!isLightboxOpen) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    document.body.style.overflow = 'hidden'
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isLightboxOpen, closeLightbox, goPrev, goNext])

  const activeSlide = lightboxIndex !== null ? slides[lightboxIndex] : null

  return (
    <>
      <section
        id="gift"
        data-section="gift"
        className={`w-full ${compact ? 'py-8 sm:py-10 md:py-12' : 'pt-16 pb-24 sm:pt-20 sm:pb-28'}`}
      >
        <div className="w-full text-center">
          <h3 className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none capitalize text-forest">
            Gift Guide
          </h3>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-albert text-obsidian/85 max-w-2xl mx-auto">
            {weddingConfig.details.giftGuide}
          </p>

          <div className={`w-full ${compact ? 'mt-6 sm:mt-8' : 'mt-10 sm:mt-12'}`}>
            <div
              className="mx-auto flex max-w-3xl flex-row items-start justify-center gap-6 px-4 sm:gap-10 md:gap-14"
              aria-label="Payment QR codes"
            >
              {slides.map((method, index) => (
                <div
                  key={method.name}
                  className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:gap-3"
                >
                  <p className="font-foglihten text-lg sm:text-xl md:text-2xl text-forest tracking-wide">
                    {method.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="cursor-pointer transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/50 focus-visible:ring-offset-2"
                    aria-label={`View ${method.name} QR code full screen`}
                  >
                    <img
                      src={method.image}
                      alt={method.alt || `${method.name} QR code`}
                      className="max-h-44 w-auto max-w-[min(42vw,200px)] object-contain sm:max-h-52 sm:max-w-[220px] md:max-h-56"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen &&
        activeSlide &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeSlide.name} QR code`}
          >
            <div
              className="absolute inset-0 bg-black/92"
              onClick={closeLightbox}
              aria-hidden
            />

            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:left-6"
                  aria-label="Previous payment method"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:right-6"
                  aria-label="Next payment method"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}

            <div
              className="relative z-10 flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-foglihten text-xl text-white/90 sm:text-2xl">{activeSlide.name}</p>
              <img
                src={activeSlide.image}
                alt={activeSlide.alt || `${activeSlide.name} QR code`}
                className="max-h-[75vh] max-w-full object-contain"
              />
              {slides.length > 1 && (
                <p className="text-sm font-albert text-white/60">
                  {lightboxIndex + 1} / {slides.length}
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default GiftRegistry
