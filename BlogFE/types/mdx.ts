import type readingTime from 'reading-time'
import type { BrandIconsMap } from '~/components/BrandIcon'
import type { TOC } from './server'

export type MdxPageLayout =
  | 'AuthorLayout'
  | 'ListLayout'
  | 'PostLayout'
  | 'PostSimple'
  | 'ResumeLayout'
  | 'SnippetLayout'
  | 'ProjectLayout'

export type MdxFrontMatterCategory =
  | 'system-architecture'
  | 'game'
  | 'software'
  | 'life'
  | 'security'

export interface MdxFrontMatter {
  layout?: MdxPageLayout
  title: string
  name?: string
  date: string
  lastmod?: string
  tags: string[]
  draft?: boolean
  summary: string
  images?: string[]
  video?: string
  authors?: string[]
  slug: string
  category: MdxFrontMatterCategory
}

export type ReadingTime = ReturnType<typeof readingTime>

export enum POST_TYPE {
  BLOG = 'blog',
  PROJECT = 'project',
}

export enum PROJECT_TYPE {
  WORK = 'work',
  SELF = 'self',
}

export interface BlogFrontMatter extends MdxFrontMatter {
  readingTime: ReadingTime
  fileName: string
  audioURL?: string
}

export interface ProjectFrontMatter extends BlogFrontMatter {
  type: POST_TYPE
  projectType: PROJECT_TYPE
  url?: string
  repo?: string
  fe?: string[]
  be?: string[]
  db?: string[]
  network?: string[]
  infra?: string[]
  tools?: string[]
}

export interface SnippetFrontMatter extends BlogFrontMatter {
  heading: string
  type: keyof typeof BrandIconsMap
}

export interface AuthorFrontMatter extends MdxFrontMatter {
  avatar: string
  github?: string
}

export interface MdxFileData {
  mdxSource: string
  frontMatter: BlogFrontMatter
  toc: TOC[]
}

export interface MdxLayoutRendererProps {
  layout: MdxPageLayout
  mdxSource: string
  frontMatter: MdxFrontMatter

  [key: string]: any
}
