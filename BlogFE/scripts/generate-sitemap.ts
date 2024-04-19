import fs from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'

let SITE_URL = 'https://thangchiba.com'

;(async () => {
  console.log('Generating sitemap...')
  let prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  let pages = await globby([
    'pages/*.tsx',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'data/projects/**/*.mdx',
    'data/projects/**/*.md',
    'public/tags/**/*.xml',
    '!pages/_*.tsx',
    '!pages/api',
  ])

  let sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            let path = page
              .replace('pages/', '/')
              .replace('data/blog', '/blog')
              .replace('data/projects', '/projects')
              .replace('public/', '/')
              .replace('.tsx', '')
              .replace('.mdx', '')
              .replace('.md', '')
              .replace('/feed.xml', '')
            let route = path === '/index' ? '' : path
            if (page === `pages/404.tsx` || page === `pages/blog/[...slug].tsx`) {
              return
            }
            return `<url><loc>${SITE_URL}${route}</loc></url>\n`
          })
          .join('')}
      </urlset>
    `

  let formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)

  console.log('Sitemap generated successfully in `public/sitemap.xml`.')
})()
