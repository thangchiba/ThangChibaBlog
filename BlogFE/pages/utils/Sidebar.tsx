import React, { useState } from 'react'
import Twemoji from '~/components/Twemoji'
import menuMap from '~/data/menuMap'

const Sidebar = ({ onNavigate, activeComponent, setActiveComponent }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden p-2 absolute top-0 left-0 z-40 bg-gray-200 dark:bg-gray-600 rounded-lg"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Twemoji emoji="hammer-and-wrench" />
        Select Tools
      </button>

      {isSidebarOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`absolute top-0 left-0 w-64 h-full bg-gray-200 dark:bg-gray-600 p-2 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-30 md:static md:translate-x-0 rounded-lg`}
      >
        <ul className="mt-10 xl:mt-0">
          {Object.entries(menuMap).map(([endpoint, { emoji, name }]) => (
            <li key={endpoint} className="my-3">
              <a
                href="#!"
                onClick={() => {
                  onNavigate(endpoint)
                  setActiveComponent(endpoint)
                  setSidebarOpen(false)
                }}
                className={`flex items-center p-2 rounded-lg ${
                  activeComponent === endpoint ? 'bg-gray-300 dark:bg-gray-700' : ''
                }`}
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
