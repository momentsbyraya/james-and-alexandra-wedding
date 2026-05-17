import React from 'react'
import { themeConfig } from '../config/themeConfig'

const DEFAULT_TEXT = 'THIS IS HALF DONE, FOR CLIENT APPROVAL ONLY'
const DEFAULT_LINES = 5
const DEFAULT_ROTATION = -32

const ApprovalWatermark = () => {
  const config = themeConfig.approvalWatermark ?? {}
  if (config.enabled === false) return null

  const text = config.text ?? DEFAULT_TEXT
  const lineCount = config.lines ?? DEFAULT_LINES
  const rotation = config.rotation ?? DEFAULT_ROTATION

  return (
    <div
      className="approval-watermark pointer-events-none fixed inset-0 z-[1000000] overflow-hidden select-none"
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 flex w-[240vmax] max-w-none flex-col items-center justify-center gap-[12vh] sm:gap-[14vh]"
        style={{
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      >
        {Array.from({ length: lineCount }, (_, index) => (
          <p
            key={index}
            className="whitespace-nowrap text-center font-albert text-lg font-semibold uppercase tracking-[0.14em] text-forest opacity-30 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ApprovalWatermark
