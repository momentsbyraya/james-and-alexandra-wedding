import React from 'react'
import { weddingConfig } from '../config/weddingConfig'

const GiftRegistry = ({ compact = false }) => {
  return (
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
      </div>
    </section>
  )
}

export default GiftRegistry
