import React from 'react'
import { ArrowRight } from 'lucide-react'
import { couple } from '../data'
import SecondaryButton from './SecondaryButton'

const RSVPSection = ({ onOpenRSVP, compact = false }) => {
  const deadlineText =
    couple.rsvpDeadline?.month && couple.rsvpDeadline?.day && couple.rsvpDeadline?.year
      ? `${couple.rsvpDeadline.month} ${couple.rsvpDeadline.day}, ${couple.rsvpDeadline.year}`
      : null

  return (
    <section
      id="rsvp"
      data-section="rsvp"
      className={`w-full ${compact ? 'py-8 sm:py-10 md:py-12' : 'pt-24 pb-16 sm:pt-28 sm:pb-20'}`}
    >
      <div className="w-full text-center">
        <h3 className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none capitalize text-forest">
          RSVP
        </h3>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-albert text-obsidian/85 max-w-2xl mx-auto leading-relaxed">
          We have reserved seat/s for you. We&apos;d love to have you with us!
          {deadlineText && (
            <>
              {' '}
              Please favor us with a response by <strong>{deadlineText}</strong>.
            </>
          )}
        </p>
        {onOpenRSVP && (
          <div className="mt-8 flex justify-center">
            <SecondaryButton onClick={onOpenRSVP} icon={ArrowRight}>
              Respond
            </SecondaryButton>
          </div>
        )}
      </div>
    </section>
  )
}

export default RSVPSection
