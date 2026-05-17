import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { couple } from '../data'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const formEmbedUrl = couple.rsvpGoogleFormEmbedUrl

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
        className="absolute inset-0 z-0 cursor-pointer bg-forest/40 backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col flex-1 min-h-0 w-full h-full min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-forest/15 bg-sage px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-xl font-leckerli font-light text-forest sm:text-2xl">
            RSVP
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-forest transition-colors duration-200 hover:bg-forest/10"
            aria-label="Close RSVP form"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="rsvp-modal-content flex min-h-0 flex-1 flex-col overflow-hidden bg-sage">
          {formEmbedUrl ? (
            <iframe
              src={formEmbedUrl}
              title="RSVP for the Wedding of Arjie and Fritzie"
              className="h-full min-h-0 w-full flex-1 border-0 bg-sage"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-1 items-center justify-center px-6">
              <p className="text-center font-albert text-forest">
                RSVP form is not available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal
