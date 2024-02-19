import Script from 'next/script'
import { siteMetadata } from '~/data/siteMetadata'

export function UmamiScript() {
  const umamiURL = process.env.NEXT_PUBLIC_UMAMI_URL || ''
  return <Script async data-website-id={siteMetadata.analytics.umamiWebsiteId} src={umamiURL} />
}
