// Run from BlogFE: node scripts/generate-narration.mjs [en|vi|jp]
// Requires macOS voices and ffmpeg. No external API or credentials are used.
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const voices = { en: 'Samantha', vi: 'Linh', jp: 'Kyoko (Enhanced)' }
const requested = process.argv[2]
if (requested && !voices[requested]) throw new Error('Choose en, vi, or jp')
const languages = requested ? [requested] : Object.keys(voices)

// Narrate prose, headings, and table values. Code, imports, embedded widgets,
// images, and URLs remain in the article rather than being read as syntax.
function spokenText(title, content) {
  const prose = content
    .replace(/^import .*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/^\s*\|[\s:|\-]+\|\s*$/gm, '')
    .replace(/\|/g, '. ')
    .replace(/^\s*(?:#{1,6}\s+|[-*]\s+)/gm, '')
    .replace(/[*`]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return `${title}.\n\n${prose}\n`
}

const manifestPath = path.join(root, 'public/static/media/narration-manifest.json')
let manifest = {}
try {
  manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

const scratch = await fs.mkdtemp(path.join(os.tmpdir(), 'blog-narration-'))
try {
  for (const language of languages) {
    for (const kind of ['blog', 'project']) {
      const directory = path.join(root, 'data', language, kind)
      for (const filename of (await fs.readdir(directory)).sort()) {
        if (!filename.endsWith('.mdx')) continue
        const sourcePath = path.join(directory, filename)
        const source = await fs.readFile(sourcePath, 'utf8')
        const { data, content } = matter(source)
        if (data.draft) continue
        const slug = filename.slice(0, -4)
        const folder = kind === 'blog' && slug.startsWith('jingi-') ? 'jingi' : slug
        // Preserve established paths, except the old Jingi paths pointing at
        // English audio in the unrelated random-generator folder.
        const audioURL =
          kind === 'blog' && slug.startsWith('jingi-')
            ? `/static/media/blog/jingi/${slug}-${language}.mp3`
            : data.audioURL || `/static/media/${kind}/${folder}/${slug}-${language}.mp3`
        const target = path.resolve(root, 'public', `.${audioURL}`)
        const mediaRoot = path.join(root, 'public/static/media') + path.sep
        if (!target.startsWith(mediaRoot) || !target.endsWith('.mp3')) {
          throw new Error(`Unexpected narration path: ${audioURL}`)
        }
        if (!audioURL.endsWith(`-${language}.mp3`)) {
          throw new Error(`Narration language mismatch: ${audioURL}`)
        }
        const text = spokenText(data.title, content)
        const sourceHash = crypto.createHash('sha256').update(text).digest('hex')
        const relativeSource = path.relative(root, sourcePath)
        let exists = false
        try {
          await fs.access(target)
          exists = true
        } catch {}
        if (exists && manifest[relativeSource]?.sourceHash === sourceHash) {
          manifest[relativeSource].contentHash = crypto
            .createHash('sha256')
            .update(`${data.title}\n${content.trim()}`)
            .digest('hex')
          manifest[relativeSource].audioHash = crypto
            .createHash('sha256')
            .update(await fs.readFile(target))
            .digest('hex')
          await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
          continue
        }

        const transcript = path.join(scratch, 'article.txt')
        const recording = path.join(scratch, 'article.aiff')
        const encoded = path.join(scratch, 'article.mp3')
        await fs.writeFile(transcript, text)
        execFileSync('say', [
          '-v',
          voices[language],
          '-r',
          '175',
          '-f',
          transcript,
          '-o',
          recording,
        ])
        execFileSync('ffmpeg', [
          '-y',
          '-v',
          'error',
          '-i',
          recording,
          '-ac',
          '1',
          '-ar',
          '24000',
          '-codec:a',
          'libmp3lame',
          '-b:a',
          '64k',
          encoded,
        ])
        const duration = Number(
          execFileSync(
            'ffprobe',
            ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', encoded],
            { encoding: 'utf8' }
          ).trim()
        )
        if (!Number.isFinite(duration) || duration < 5)
          throw new Error(`Empty narration: ${filename}`)
        await fs.mkdir(path.dirname(target), { recursive: true })
        await fs.copyFile(encoded, target)

        const withAudio = /^audioURL:.*$/m.test(source)
          ? source.replace(/^audioURL:.*$/m, `audioURL: '${audioURL}'`)
          : source.replace(/^---\n/, `---\naudioURL: '${audioURL}'\n`)
        await fs.writeFile(sourcePath, withAudio)
        const contentHash = crypto
          .createHash('sha256')
          .update(`${data.title}\n${content.trim()}`)
          .digest('hex')
        const audioHash = crypto
          .createHash('sha256')
          .update(await fs.readFile(target))
          .digest('hex')
        manifest[relativeSource] = {
          audioURL,
          voice: voices[language],
          sourceHash,
          contentHash,
          audioHash,
          durationSeconds: duration,
        }
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
        console.log(`${relativeSource}: ${Math.round(duration)}s`)
      }
    }
  }
} finally {
  await fs.rm(scratch, { recursive: true, force: true })
}
