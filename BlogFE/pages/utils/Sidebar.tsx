import React, { useState } from 'react'
import Twemoji from '~/components/Twemoji'
import menuMap from '~/pages/utils/menuMap'

const Sidebar = ({ onNavigate }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden p-2 text-white absolute top-0 left-0 z-40 bg-gray-600 rounded-xl"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Twemoji emoji="hammer-and-wrench" />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`absolute top-0 left-0 w-64 bg-gray-600 p-5 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-30 md:static md:translate-x-0 rounded-2xl`}
      >
        <ul className="mt-5 xl:mt-0">
          {Object.entries(menuMap).map(([endpoint, { emoji, name }]) => (
            <li key={endpoint} className="my-3">
              <a
                href="#!"
                onClick={() => {
                  onNavigate(endpoint)
                  setSidebarOpen(false)
                }}
                className="flex items-center"
              >
                <Twemoji emoji={emoji} className="mx-2" />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
