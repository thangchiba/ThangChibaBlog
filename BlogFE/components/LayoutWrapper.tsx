import { useState } from 'react'
import { MAIN_CONTENT_MIN_HEIGHT } from '~/constant'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { useRouter } from 'next/router'

export function LayoutWrapper({ children }) {
  let [navShow, setNavShow] = useState(false)
  let onToggleNav = () => setNavShow((status) => !status)

  const router = useRouter()
  console.log(router)
  // const isClient = typeof window !== 'undefined'
  const path = router.pathname || ''
  // Determine the maximum width class based on the current path
  const maxXLWidthClass =
    path === '/utils' || path === '/course'
      ? 'xl:max-w-7xl' // Adjust the maximum width as needed
      : 'xl:max-w-5xl'

  // const maxXLWidthClass = 'xl:max-w-5xl'
  return (
    <>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
      <Header navShow={navShow} onToggleNav={onToggleNav} />
      <div className={`mx-auto max-w-3xl px-3 sm:px-6 ${maxXLWidthClass} xl:px-0`}>
        <div className="flex flex-col justify-between">
          <main style={{ minHeight: MAIN_CONTENT_MIN_HEIGHT }}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}
