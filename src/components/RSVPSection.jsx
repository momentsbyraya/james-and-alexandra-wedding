import React from 'react'
import { ArrowRight } from 'lucide-react'
import { couple } from '../data'
import SecondaryButton from './SecondaryButton'

const RSVPSection = ({ onOpenRSVP }) => {
  const deadlineText = couple.rsvpDeadline
    ? `${couple.rsvpDeadline.month} ${couple.rsvpDeadline.day}, ${couple.rsvpDeadline.year}`
    : 'May 4, 2026'

  return (
    <section
      id="rsvp"
      data-section="rsvp"
      className="w-full pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div className="w-full text-center">
        <h3 className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none capitalize text-forest">
          RSVP
        </h3>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-albert text-obsidian/85 max-w-2xl mx-auto">
          Kindly respond on or before <strong>{deadlineText}</strong>. After this date, arrangements are final.
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
