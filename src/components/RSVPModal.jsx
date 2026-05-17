import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { prenupImages } from '../data'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(contentRef.current, { opacity: 0, y: 24 })

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    gsap
      .to(contentRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.25,
        ease: 'power2.out',
      })
      .then(() => {
        onClose()
      })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex flex-col m-0 p-0"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 cursor-pointer overflow-hidden"
        onClick={handleOverlayClick}
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url(${prenupImages.modalBackground})`,
            filter: 'blur(14px)',
            transform: 'scale(1.12)',
          }}
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col flex-1 min-h-0 w-full h-full min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 border-b border-gold/25 bg-sage/95 backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-leckerli font-light text-forest">
            RSVP
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-forest hover:bg-gold/20 rounded-full transition-colors duration-200"
            aria-label="Close RSVP form"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex flex-1 min-h-0 items-center justify-center bg-sage/90 px-6 backdrop-blur-sm">
          <p className="font-foglihten text-3xl uppercase tracking-wide text-forest sm:text-4xl md:text-5xl">
            To Be Added
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal
