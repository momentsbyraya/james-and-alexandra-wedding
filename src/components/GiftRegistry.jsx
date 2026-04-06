import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'

const GiftRegistry = () => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const { paymentMethods } = paymentMethodsData

  return (
    <>
      <section
        id="gift"
        data-section="gift"
        className="w-full pt-16 pb-24 sm:pt-20 sm:pb-28"
      >
        <div className="w-full text-center">
          <h3 className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none capitalize text-forest">
            Gift Guide
          </h3>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-albert text-obsidian/85 max-w-2xl mx-auto">
            As we blend our two houses into one, we have all the belongings we could need. For those who wish to
            give, a gift of cash to help us build our first home together would be a wonderful blessing.
          </p>
        </div>
      </section>

      {isGiftModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsGiftModalOpen(false)}
          />

          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
              <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800">Methods</h3>
              <button
                onClick={() => setIsGiftModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {paymentMethods && paymentMethods.length > 0 && (
                <div className="flex items-center justify-center">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-center">
                      {method.image && (
                        <img
                          src={method.image}
                          alt="Gift payment method"
                          className="w-full max-w-md h-auto object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry
