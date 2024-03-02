import type { CommentConfigType } from './components'
import type { AuthorFrontMatter, BlogFrontMatter, MdxFileData, ProjectFrontMatter } from './mdx'
import type { PaginationType } from './server'

export interface ProjectProps {
  post: MdxFileData
  commentConfig: CommentConfigType
}

export interface ProjectListProps {
  posts: ProjectFrontMatter[]
  initialDisplayPosts: ProjectFrontMatter[]
  pagination: PaginationType
}

export interface SnippetProps {
  snippet: MdxFileData
  commentConfig: CommentConfigType
}

export interface BlogListProps {
  posts: BlogFrontMatter[]
  initialDisplayPosts: BlogFrontMatter[]
  pagination: PaginationType
}

export interface BlogProps {
  post: MdxFileData
  authorDetails: AuthorFrontMatter[]
  prev: BlogFrontMatter
  next: BlogFrontMatter
  page: number
  commentConfig: CommentConfigType
}
