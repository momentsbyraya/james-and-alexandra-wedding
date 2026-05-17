import React from 'react'
import { entourage } from '../data'
import { themeConfig } from '../config/themeConfig'

/**
 * Entourage copy from `entourage.json` — modal, home, details, and /entourage page.
 */
const EntourageTextContent = ({
  accentColor: accentColorProp,
  className = '',
  nameClassName = 'text-[9px] sm:text-[13px] md:text-[15px] font-poppins uppercase text-[#171717]',
  titleClassName = 'font-boska text-base sm:text-lg md:text-xl mb-3 font-medium normal-case',
}) => {
  const accentColor = accentColorProp ?? themeConfig.text.burgundyDark ?? '#094a2f'
  const { sections = [] } = entourage

  return (
    <div className={`entourage-text-content min-w-0 ${className}`}>
      {sections.map((section) => {
        if (section.titleOnly && section.title) {
          return (
            <div key={section.id} className="mb-6 text-center">
              <h3
                className={`${titleClassName} text-center imperial-script-regular text-2xl sm:text-3xl md:text-4xl mb-0`}
                style={{ color: accentColor }}
              >
                {section.title}
              </h3>
            </div>
          )
        }

        if (section.paired?.left && section.paired?.right) {
          const { left, right } = section.paired
          return (
            <div key={section.id} className="mb-8">
              <div className="flex flex-row gap-4 sm:gap-8 md:gap-10 justify-center items-start">
                <div className="flex-1 min-w-0 text-right">
                  <h3 className={`${titleClassName} text-right`} style={{ color: accentColor }}>
                    {left.title}
                  </h3>
                  <div className="space-y-1.5">
                    {(left.names || []).map((name, i) => (
                      <p key={`pl-${i}`} className={`${nameClassName} text-right`}>
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h3 className={`${titleClassName} text-left`} style={{ color: accentColor }}>
                    {right.title}
                  </h3>
                  <div className="space-y-1.5">
                    {(right.names || []).map((name, i) => (
                      <p key={`pr-${i}`} className={`${nameClassName} text-left`}>
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }

        if (section.twoColumns?.left?.length || section.twoColumns?.right?.length) {
          const { left = [], right = [] } = section.twoColumns
          return (
            <div key={section.id} className="mb-8">
              <h3 className={`${titleClassName} text-center`} style={{ color: accentColor }}>
                {section.title}
              </h3>
              <div className="flex flex-row gap-4 sm:gap-8 md:gap-10 justify-center items-start">
                <div className="flex-1 min-w-0">
                  <div className="space-y-2">
                    {left.map((name, i) => (
                      <p key={`l-${i}`} className={`${nameClassName} text-right`}>
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="space-y-2">
                    {right.map((name, i) => (
                      <p key={`r-${i}`} className={`${nameClassName} text-left`}>
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }

        if (!section.names?.length) return null

        return (
          <div key={section.id} className="mb-8 text-center">
            <h3 className={`${titleClassName} text-center`} style={{ color: accentColor }}>
              {section.title}
            </h3>
            <div className="space-y-1.5">
              {section.names.map((name, i) => (
                <p key={i} className={`${nameClassName} text-center`}>
                  {name}
                </p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EntourageTextContent
