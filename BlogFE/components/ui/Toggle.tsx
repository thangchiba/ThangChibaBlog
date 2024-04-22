import React, { useState } from 'react'

interface ToggleProps {
  text: string
  children: React.ReactNode
}

const Toggle: React.FC<ToggleProps> = ({ children, text }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDown = (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  )

  const toggleUp = (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
    </svg>
  )

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-bold bg-transparent flex items-center space-x-2"
      >
        <span>{text}</span>
        <span>{isOpen ? toggleUp : toggleDown}</span>
      </button>
      {isOpen && <div className="px-3 rounded-md">{children}</div>}
    </div>
  )
}

export default Toggle
