// components/FloatingChatButton.tsx
import React, { useState } from 'react'
import TypedBubble from './TypedBubble'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const iframeSrc =
  'http://api.thangchiba.com:25020/chat/share?shared_id=74a296aacb7c11ef90ba0242ac120004&from=chat&auth=Q4NWRiMmUwYzgxMzExZWY4ZTA0MDI0Mm'

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const chatButtonImage = '/static/icons/cuterobot2-removebg.png'
  const avatarImage = '/static/icons/cuterobot2-removebg.png'
  let { t } = useTranslation('common')

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* --- FLOATING WRAPPER --- */}
      <div className="fixed bottom-0 right-2 z-[2]">
        {/* BUBBLE ALWAYS VISIBLE (Typed text) */}
        <TypedBubble />

        {/* FLOATING BUTTON */}
        <button
          onClick={handleToggle}
          className="
            w-[60px]
            h-[75px]
            p-0
            bg-transparent
            cursor-pointer
            transition-transform
            transform
            scale-x-[-1]
          "
        >
          <Image
            src={chatButtonImage}
            alt="Chat Button"
            className="
              w-full
              h-full
            "
          />
        </button>
      </div>

      {/* --- CHAT WINDOW --- */}
      <div
        className={`
          fixed
          bottom-[0px]
          right-[0px]
          md:bottom-[90px]
          md:right-[20px]
          bg-white
          shadow-xl
          rounded-[15px]
          z-[99]
          overflow-hidden
          transition-all
          duration-300
          ${isOpen ? 'block' : 'hidden'}
          // Default size
          w-full
          h-full
          // Expand size on medium+ screens
          md:w-[400px]
          md:h-[500px]
        `}
      >
        {/* HEADER */}
        <div className="relative flex items-center bg-gray-100 px-3 py-2">
          {/* Avatar */}
          <Image src={avatarImage} alt="Avatar" className="w-[50px] h-[50px] mr-2" />
          {/* Title */}
          <span className="font-bold text-xl text-violet-600">{t('rag.title')}</span>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="
              absolute
              top-1/2
              right-4
              -translate-y-1/2
              w-[30px]
              h-[30px]
              rounded-full
              bg-red-500
              text-white
              font-bold
              border-none
              cursor-pointer
            "
          >
            X
          </button>
        </div>

        {/* IFRAME */}
        <div className="w-full h-[calc(100%-65px)]">
          <iframe
            title="RAGChatBot"
            src={iframeSrc}
            frameBorder="0"
            className="w-full h-full border-none"
          ></iframe>
        </div>
      </div>
    </>
  )
}
