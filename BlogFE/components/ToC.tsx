import { useEffect, useRef, type MouseEvent } from 'react'
import type { TOC } from '~/types/server'

export function ToC({ toc }: { toc: TOC[] }) {
  let navRef = useRef(null)
  let activeIdRef = useRef(null)

  useEffect(() => {
    // Logic for adding styles to strong elements
    const strongElements = document.querySelectorAll('strong')
    strongElements.forEach((element) => {
      element.classList.add('text-gray-800', 'dark:text-gray-300')
    })

    // IntersectionObserver logic
    let observerOptions = {
      rootMargin: '-10px 0px 0px 0px',
      threshold: 0,
    }
    let observer = new IntersectionObserver((entries) => {
      let firstActiveId = null
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          if (
            !firstActiveId ||
            entry.target.getBoundingClientRect().top <
              document.querySelector(`#${firstActiveId}`).getBoundingClientRect().top
          ) {
            firstActiveId = entry.target.getAttribute('id')
          }
        }
      })

      if (firstActiveId && activeIdRef.current !== firstActiveId) {
        if (activeIdRef.current) {
          let previousActiveAnchor = navRef.current.querySelector(
            `li a[href="#${activeIdRef.current}"]`
          )
          if (previousActiveAnchor) {
            previousActiveAnchor.classList.remove('text-orange-800')
          }
        }

        let currentActiveAnchor = navRef.current.querySelector(`li a[href="#${firstActiveId}"]`)
        if (currentActiveAnchor) {
          currentActiveAnchor.classList.add('text-orange-800')
        }

        activeIdRef.current = firstActiveId
      }
    }, observerOptions)

    // Track only the headers that are in the ToC
    toc.forEach((item) => {
      let header = document.querySelector(item.url)
      if (header) {
        observer.observe(header)
        header.classList.add('text-gray-800', 'dark:text-green-300')
      }
    })

    // Cleanup function
    return () => {
      // Disconnect the observer
      observer.disconnect()
    }
  }, [toc]) // Ensure this effect runs only when `toc` changes.

  let handleLinkClick = (e: MouseEvent, url: string) => {
    e.preventDefault()
    let targetElement: HTMLElement = document.querySelector(url)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav ref={navRef} className="pl-0 md:sticky top-24 self-start">
      <ul className="list-none space-y-1.5">
        {toc.map((item, index) => (
          <li key={index}>
            <a
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
              className="block text-gray-800 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-200 transition ease-in-out duration-150"
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
