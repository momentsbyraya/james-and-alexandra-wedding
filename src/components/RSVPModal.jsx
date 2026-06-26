import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { couple } from '../data'
import { MODAL_BACKDROP_BLUR_CLASS } from '../utils/safariCompat'

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
      gsap.set(contentRef.current, { opacity: 0, y: 32, scale: 0.94 })

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.4)',
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
        scale: 0.96,
        duration: 0.25,
        ease: 'power2.in',
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
      className="fixed inset-0 z-[10050] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
    >
      <div
        ref={overlayRef}
        className={`absolute inset-0 z-0 cursor-pointer bg-forest/50 ${MODAL_BACKDROP_BLUR_CLASS}`}
        onClick={handleOverlayClick}
        aria-hidden
      />

      <div
        ref={contentRef}
        className="relative z-10 flex max-h-[min(90vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-forest/10 bg-sage shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-forest/15 bg-sage px-4 py-3 sm:px-6 sm:py-4">
          <h2
            id="rsvp-modal-title"
            className="text-xl font-leckerli font-light text-forest sm:text-2xl"
          >
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

        <div
          className={`rsvp-modal-content flex flex-1 flex-col overflow-hidden bg-sage ${
            formEmbedUrl ? 'min-h-[min(70vh,640px)]' : 'min-h-[12rem] sm:min-h-[14rem]'
          }`}
        >
          {formEmbedUrl ? (
            <iframe
              src={formEmbedUrl}
              title="RSVP for the Wedding of James and Alexandra"
              className="h-full min-h-0 w-full flex-1 border-0 bg-sage"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-1 items-center justify-center px-6 py-12">
              <p className="text-center font-foglihten text-2xl text-forest sm:text-3xl">
                To be added
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
