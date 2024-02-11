import Script from 'next/script'
import { siteMetadata } from '~/data/siteMetadata'

export function UmamiScript() {
  return (
    <Script
      async
      data-website-id={siteMetadata.analytics.umamiWebsiteId}
      src="http://api.thangchiba.com:51211/umami.js"
    />
  )
}
