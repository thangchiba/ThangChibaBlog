import type { siteMetadata } from '~/data/siteMetadata'

export interface Project {
  type: 'work' | 'self'
  title: string
  description?: string
  imgSrc: string
  url?: string
  detail?: string
  repo?: string
  builtWith?: string[]
  fe?: string[]
  be?: string[]
  db?: string[]
  network?: string[]
  infra?: string[]
  tools?: string[]
}

export type SiteMetaData = typeof siteMetadata & {
  title: string
  author: string
  full_name: string
  header_title: string
  footer_title: string
  description: string
  language: string
}
