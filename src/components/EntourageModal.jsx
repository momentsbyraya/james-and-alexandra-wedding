import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import EntourageTextContent from './EntourageTextContent'
import { themeConfig } from '../config/themeConfig'
import './pages/Entourage.css'

const EntourageModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const accentColor = themeConfig.text.burgundyDark ?? '#094a2f'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { y: 20 })

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    gsap.to(contentRef.current, { opacity: 0, y: 20, duration: 0.2, ease: 'power2.out' }).then(() => onClose())
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60"
        onClick={handleOverlayClick}
      />

      <div
        ref={contentRef}
        className="absolute inset-0 w-screen h-screen overflow-y-auto"
        style={{
          backgroundImage: 'url(/assets/images/graphics/bg-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <button
          onClick={handleClose}
          className="fixed top-4 right-4 z-20 p-2 text-forest hover:text-black bg-white/70 hover:bg-white/90 rounded-full transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full">
          <img
            src="/assets/images/graphics/flower-banner-2.png"
            alt=""
            className="w-full h-auto object-contain pointer-events-none"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 entourage-names-single-line">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 font-boska text-center text-forest">
            Entourage
          </h2>
          <EntourageTextContent accentColor={accentColor} />
        </div>

        <div className="relative w-full">
          <img
            src="/assets/images/graphics/flower-banner-3.png"
            alt=""
            className="w-full h-auto object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EntourageModal
