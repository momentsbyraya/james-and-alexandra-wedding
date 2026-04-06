import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SecondaryButton from './SecondaryButton'
import EntourageModal from './EntourageModal'

const EntourageSection = () => {
  const [isEntourageModalOpen, setIsEntourageModalOpen] = useState(false)

  return (
    <section
      id="entourage"
      data-section="entourage"
      className="w-full py-16 sm:py-20"
    >
      <div className="w-full text-center">
        <h3 className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none capitalize text-forest">
          Entourage
        </h3>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-albert text-obsidian/85 max-w-2xl mx-auto">
          Meet the family and friends who will walk with us and witness our special day.
        </p>
        <div className="mt-8 flex justify-center">
          <SecondaryButton
            onClick={() => setIsEntourageModalOpen(true)}
            icon={ArrowRight}
          >
            View Entourage
          </SecondaryButton>
        </div>
      </div>

      <EntourageModal
        isOpen={isEntourageModalOpen}
        onClose={() => setIsEntourageModalOpen(false)}
      />
    </section>
  )
}

export default EntourageSection
