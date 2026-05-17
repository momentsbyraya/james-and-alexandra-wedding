import { gsap } from 'gsap'

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
