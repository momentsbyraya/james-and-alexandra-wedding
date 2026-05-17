import React, { useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import EntourageTextContent from '../EntourageTextContent'
import { themeConfig } from '../../config/themeConfig'
import './Entourage.css'
import { createScrollTriggerScope } from '../../utils/safariCompat'

gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const scrollScope = useMemo(() => createScrollTriggerScope(), [])

  useEffect(() => {
    if (sectionRef.current) gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    if (backButtonRef.current) gsap.set(backButtonRef.current, { opacity: 0, scale: 0 })

    const nameLines = contentRef.current?.querySelectorAll('p.font-poppins')
    if (nameLines?.length) gsap.set(nameLines, { opacity: 0, y: 20 })

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
    }
    if (backButtonRef.current) {
      gsap.fromTo(
        backButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.6 }
      )
    }
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      )
    }

    if (contentRef.current && nameLines?.length) {
      scrollScope.add(
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(nameLines, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              stagger: 0.035,
            })
          },
          toggleActions: 'play none none reverse',
        })
      )
    }

    return () => scrollScope.kill()
  }, [scrollScope])

  const accentColor = themeConfig.text.burgundyDark ?? '#094a2f'
  const titleSizes = 'font-boska text-base sm:text-lg md:text-xl mb-3 font-medium normal-case'

  return (
    <>
      <section
        ref={sectionRef}
        id="entourage"
        data-section="entourage"
        className="relative w-full overflow-visible px-6 py-32 sm:py-40 md:py-44 lg:py-52"
        style={{
          opacity: 0,
          transform: 'translateX(100%)',
          backgroundImage: 'url(/assets/images/graphics/bg-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <img
            src="/assets/images/graphics/flower-banner-3.png"
            alt=""
            className="w-full h-auto object-contain"
            style={{ transform: 'scaleY(-1)' }}
          />
        </div>

        <div className="relative z-20 flex items-center justify-center py-12">
          <div className="site-content-width">
            <div className="mb-12 text-center">
              <h2
                ref={headerRef}
                className="font-boska text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium"
                style={{ color: accentColor }}
              >
                Entourage
              </h2>
            </div>

            <div ref={contentRef} className="entourage-names-single-line space-y-2">
              <EntourageTextContent
                accentColor={accentColor}
                titleClassName={titleSizes}
                nameClassName="text-[7.5px] sm:text-[11px] md:text-[13px] font-poppins uppercase text-[#171717]"
              />
            </div>
          </div>
        </div>

        <div className="relative w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          <img
            src="/assets/images/graphics/flower-banner-2.png"
            alt=""
            className="w-full h-auto object-contain"
            style={{ transform: 'scaleY(-1)' }}
          />
        </div>
      </section>

      <button
        ref={backButtonRef}
        type="button"
        onClick={() => {
          if (sectionRef.current) {
            gsap.to(sectionRef.current, {
              x: '-100%',
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in',
              onComplete: () => navigate('/'),
            })
          } else {
            navigate('/')
          }
        }}
        className="fixed bottom-12 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-forest/10 bg-gold text-forest shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gold-dark hover:text-white group"
        aria-label="Back to home"
        style={{ pointerEvents: 'auto' }}
      >
        <ArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" />
      </button>
    </>
  )
}

export default Entourage
