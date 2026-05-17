import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { MODAL_OVERLAY_CLASS } from '../utils/safariCompat'
import { X } from 'lucide-react'

/**
 * Full-view single image: dark overlay, close (top-right), no carousel.
 * Renders via portal so it sits above page chrome (e.g. Details / Home overlays).
 */
const ImageLightbox = ({ isOpen, src, alt = '', onClose }) => {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen || !src) return
    const ov = overlayRef.current
    const ct = contentRef.current
    if (!ov || !ct) return

    gsap.set([ov, ct], { opacity: 0 })
    gsap.set(ct, { scale: 0.9 })
    gsap.to(ov, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(ct, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [isOpen, src])

  if (!isOpen || !src) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        ref={overlayRef}
        className={MODAL_OVERLAY_CLASS}
        onClick={() => onCloseRef.current()}
      />

      <button
        type="button"
        onClick={() => onCloseRef.current()}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
        style={{ pointerEvents: 'auto' }}
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div
        ref={contentRef}
        className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center p-4"
        style={{ pointerEvents: 'none' }}
      >
        <img src={src} alt={alt} className="max-w-full max-h-[90vh] object-contain" />
      </div>
    </div>,
    document.body
  )
}

export default ImageLightbox
