import React from 'react'
import Hero from './Hero'
import Venue from './Venue'
import Schedule from './Schedule'
import DressCode from './DressCode'
import EntourageSection from './EntourageSection'
import RSVPSection from './RSVPSection'
import LoveStory from './LoveStory'
import Gallery from './Gallery'
import GiftRegistry from './GiftRegistry'
import FAQ from './FAQ'
import SaveTheDateCounter from './SaveTheDateCounter'
import FullBleedPhoto from './FullBleedPhoto'
import { couple, prenupImages } from '../data'
import './pages/Details.css'

const photoAlt = couple.together.replace('&', 'and')

const bgSectionStyle = {
  backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

const Home = ({ onOpenRSVP }) => {
  return (
    <div className="relative w-full bg-sage">
      {/* 1. First page — photo, date & names (Hero; venue not shown) */}
      <Hero />

      {/* 2. Where to go — venue, directions, time */}
      <div
        className="embossed-bg"
        style={{
          backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-2.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="relative z-20 flex items-center justify-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
          <div className="site-content-width">
            <Venue />
          </div>
        </div>

        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-3.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* 3. Second full-bleed photo */}
      <FullBleedPhoto
        src={prenupImages.fullBleedAfterVenue}
        alt={photoAlt}
      />

      {/* 4. Order of events */}
      <div style={bgSectionStyle}>
        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-3.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
            style={{ transform: 'scaleY(-1)' }}
          />
        </div>

        <div className="relative z-20 flex items-center justify-center py-10 sm:py-12 md:py-16">
          <div className="site-content-width">
            <Schedule />
          </div>
        </div>

        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-2.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
            style={{ transform: 'scaleY(-1)' }}
          />
        </div>
      </div>

      {/* 5. Third full-bleed photo */}
      <FullBleedPhoto
        src={prenupImages.fullBleedAfterSchedule}
        alt={photoAlt}
      />

      {/* 6. Entourage */}
      <div style={bgSectionStyle}>
        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-3.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
            style={{ transform: 'scaleY(-1)' }}
          />
        </div>

        <div className="relative z-20 flex items-center justify-center py-10 sm:py-12 md:py-16">
          <div className="site-content-width">
            <EntourageSection />
          </div>
        </div>

        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-2.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
            style={{ transform: 'scaleY(-1)' }}
          />
        </div>
      </div>

      {/* 7. Our Love Story */}
      <div style={bgSectionStyle}>
        <div className="relative z-20 flex items-center justify-center py-10 sm:py-12 md:py-16">
          <div className="site-content-width">
            <LoveStory />
          </div>
        </div>
      </div>

      {/* 8. Fourth full-bleed photo */}
      <FullBleedPhoto
        src={prenupImages.fullBleedAfterLoveStory}
        alt={photoAlt}
      />

      {/* 9. Dress code */}
      <div style={bgSectionStyle}>
        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-2.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="relative z-20 flex items-center justify-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
          <div className="site-content-width">
            <DressCode />
          </div>
        </div>

        <div className="relative" style={{ width: '100vw' }}>
          <img
            src="/assets/images/graphics/flower-banner-3.png"
            alt="Flower banner"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* 10. Fifth full-bleed photo */}
      <FullBleedPhoto
        src={prenupImages.fullBleedAfterDressCode}
        alt={photoAlt}
      />

      {/* 11–12. RSVP & Gift guide */}
      <div style={bgSectionStyle}>
        <div className="relative z-20 flex items-center justify-center py-8 sm:py-10">
          <div className="site-content-width">
            <RSVPSection onOpenRSVP={onOpenRSVP} />
          </div>
        </div>

        <div className="site-content-width flex items-center gap-3">
          <div className="h-px bg-gold/50 flex-1" />
          <div className="w-2 h-2 border border-gold/70 rotate-45 flex-shrink-0" />
          <div className="h-px bg-gold/50 flex-1" />
        </div>

        <div className="relative z-20 flex items-center justify-center pb-8 sm:pb-10">
          <div className="site-content-width">
            <GiftRegistry />
          </div>
        </div>
      </div>

      {/* 13. Gallery */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="site-content-width">
          <Gallery />
        </div>
      </div>

      {/* 14. FAQ */}
      <FAQ />

      {/* 15. Save the Date & countdown */}
      <SaveTheDateCounter />
    </div>
  )
}

export default Home
