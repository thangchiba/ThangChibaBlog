import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { MessageCircleHeart } from 'lucide-react'

const CypherChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const roomName = process.env.CYPHER_ROOM_NAME
  const enigma = process.env.CYPHER_ENIGMA || ''

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
            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
              {/*<Dialog.Title*/}
              {/*  as="h3"*/}
              {/*  className="text-lg text-center font-medium leading-6 text-gray-900 my-1"*/}
              {/*>*/}
              {/*  Community Chat*/}
              {/*</Dialog.Title>*/}
              {/* Adjust the height of the iframe for a larger view */}
              {isOpen && (
                <iframe
                  title="Cypher Chat"
                  src={`https://cypher.thangchiba.com/room/${roomName}?enigma=${enigma}`}
                  frameBorder="0"
                  className="w-full h-[700px]" // Adjusted height here
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

export default CypherChat
