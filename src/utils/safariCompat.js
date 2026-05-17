import { gsap } from 'gsap'

/** Modal overlay: blur stripped on .safari-lite via index.css */
export const MODAL_OVERLAY_CLASS = 'modal-backdrop-blur bg-black/90 backdrop-blur-sm'

/** Blur utility only — pair with your own background color */
export const MODAL_BACKDROP_BLUR_CLASS = 'modal-backdrop-blur backdrop-blur-sm'

export function isSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS/i.test(ua)
}

export function isIOS() {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

/** iOS Safari + desktop Safari — enable lighter GPU / memory path */
export function shouldUseSafariLiteMode() {
  return isIOS() || isSafari()
}

export function initSafariCompat() {
  if (typeof document === 'undefined') return
  if (shouldUseSafariLiteMode()) {
    document.documentElement.classList.add('safari-lite')
  }
}

/** Track ScrollTrigger instances for scoped cleanup (avoids killing the whole page). */
export function createScrollTriggerScope() {
  const instances = []
  return {
    add(instance) {
      if (instance) instances.push(instance)
      return instance
    },
    kill() {
      instances.forEach((item) => {
        if (item?.kill) item.kill()
      })
      instances.length = 0
    },
  }
}

export function useGsapForce3D() {
  return shouldUseSafariLiteMode() ? false : true
}

/**
 * If GSAP left elements invisible (Safari / StrictMode), reveal them after a delay.
 */
export function scheduleGsapRevealFallback(refs, { delayMs = 2800, clearProps = 'opacity,y,transform,scale,x' } = {}) {
  const elements = (Array.isArray(refs) ? refs : [refs]).filter(Boolean)
  if (!elements.length) return () => {}

  const id = window.setTimeout(() => {
    elements.forEach((el) => {
      if (parseFloat(window.getComputedStyle(el).opacity) < 0.15) {
        gsap.killTweensOf(el)
        gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, clearProps })
      }
    })
  }, delayMs)

  return () => clearTimeout(id)
}
