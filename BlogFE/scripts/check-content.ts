// Run from BlogFE: npx tsx scripts/check-content.ts
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import matter from 'gray-matter'
import { getFileBySlug, getAllFilesFrontMatter } from '../libs/mdx.server'
import type { ProjectFrontMatter } from '../types/mdx'

async function main() {
  Object.assign(process.env, { NODE_ENV: process.env.NODE_ENV || 'production' })
  const languages = ['en', 'vi', 'jp']
  const manifestPath = 'public/static/media/narration-manifest.json'
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {}
  let compiled = 0
  let narrated = 0
  const catalogs: Record<string, string[]> = {}

  for (const language of languages) {
    const slugs: string[] = []
    for (const kind of ['authors', 'blog', 'project', 'snippets']) {
      for (const filename of fs.readdirSync(`data/${language}/${kind}`).sort()) {
        if (!filename.endsWith('.mdx')) continue
        const file = `data/${language}/${kind}/${filename}`
        const source = fs.readFileSync(file, 'utf8')
        const { data, content } = matter(source)
        const slug = filename.slice(0, -4)
        slugs.push(`${kind}/${slug}`)
        if (kind !== 'authors' && (!data.title || !data.summary || !data.date)) {
          throw new Error(`Incomplete frontmatter: ${file}`)
        }
        for (const [, routeKind, targetSlug] of content.matchAll(
          /\]\(\/(blog|project)\/([^)#?]+)(?:#[^)]*)?\)/g
        )) {
          const target = path.join('data', language, routeKind, `${targetSlug}.mdx`)
          if (!fs.existsSync(target)) throw new Error(`Broken link in ${file}: ${target}`)
        }
        for (const asset of [...(data.images || []), data.audioURL].filter(Boolean)) {
          if (asset.startsWith('/static/') && !fs.existsSync(path.join('public', asset))) {
            throw new Error(`Missing asset in ${file}: ${asset}`)
          }
        }
        if (data.audioURL && !data.draft) {
          if (!data.audioURL.endsWith(`-${language}.mp3`)) {
            throw new Error(`Wrong audio language: ${file}`)
          }
          const record = manifest[file]
          if (!record || record.audioURL !== data.audioURL || record.durationSeconds < 5) {
            throw new Error(`Missing narration record: ${file}`)
          }
          if (
            !record.audioHash ||
            record.audioHash !==
              crypto
                .createHash('sha256')
                .update(fs.readFileSync(path.join('public', data.audioURL)))
                .digest('hex')
          ) {
            throw new Error(`Narration file changed: ${file}`)
          }
          if (
            record.contentHash !==
            crypto.createHash('sha256').update(`${data.title}\n${content.trim()}`).digest('hex')
          ) {
            throw new Error(`Narration is out of date: ${file}`)
          }
          narrated++
        }
        await getFileBySlug(language, kind, slug)
        compiled++
      }
    }
    catalogs[language] = slugs.sort()
    const projects = getAllFilesFrontMatter(
      `${language}/project`
    ) as unknown as ProjectFrontMatter[]
    const workProjects = projects.filter((project) => project.projectType === 'work')
    if (projects.length !== 10 || workProjects.length !== 4) {
      throw new Error(`Unexpected project catalog: ${language}`)
    }
  }
  if (
    languages.some((language) => JSON.stringify(catalogs[language]) !== JSON.stringify(catalogs.en))
  ) {
    throw new Error('The localized content catalogs differ')
  }
  console.log(
    `Compiled ${compiled} MDX files; verified ${narrated} narrations and localized internal links.`
  )
  console.log(
    'Each locale lists 6 personal projects and 4 work projects; starter templates remain drafts.'
  )
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
