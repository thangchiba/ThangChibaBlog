import React, { useMemo, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { MessageCircleHeart, XCircle } from 'lucide-react'

export function CypherChat() {
  const [isOpen, setIsOpen] = useState(false)
  const roomName = process.env.NEXT_PUBLIC_CYPHER_CHAT_ROOM
  const enigma = process.env.NEXT_PUBLIC_CYPHER_CHAT_ENIGMA || ''
  // Random a number with value string from '000001' to '999999'
  const randomId = useMemo(
    () => String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0'),
    []
  )
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      {/* Icon Button */}

      <button
        aria-label="Open Chat Room"
        type="button"
        className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={openModal}
        data-umami-event="nav-cypher-chat"
      >
        <MessageCircleHeart strokeWidth={1.5} size={20} />
      </button>

      {/* Dialog */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* The overlay */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>

        {/* The modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-0 text-center">
            {/* Adjust the width and padding of the Dialog.Panel for a larger size */}
            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-black p-0 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mt-1 md:hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1"></div>{' '}
                  {/* This div is used to balance the space on the left side */}
                  <span className="flex-3 text-center text-white">Cypher Chat</span>
                  <button
                    type="button"
                    className="flex-1 inline-flex justify-end rounded-md border border-transparent text-red-700 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    <XCircle strokeWidth={2} size={25} className="text-right" />
                  </button>
                </div>
              </Dialog.Title>
              {/* Adjust the height of the iframe for a larger view */}
              {isOpen && (
                <iframe
                  title="Cypher Chat"
                  src={`https://cypher.thangchiba.com/room/${roomName}?enigma=${enigma}&nickName=User${randomId}`}
                  frameBorder="0"
                  className="w-full h-[680px]" // Adjusted height here
                  allowFullScreen
                ></iframe>
              )}
              {/*<div className="mt-0">*/}
              {/*  <button*/}
              {/*    type="button"*/}
              {/*    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"*/}
              {/*    onClick={closeModal}*/}
              {/*  >*/}
              {/*    Close Chat*/}
              {/*  </button>*/}
              {/*</div>*/}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
