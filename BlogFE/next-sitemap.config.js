const fs = require('fs')
const prettier = require('prettier')

module.exports = {
  siteUrl: 'https://blog.thangchiba.com',
  generateRobotsTxt: true,
  exclude: ['/404'],
  outDir: './public',
  additionalPaths: async (config) => {
    const globby = (await import('globby')).globby
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
    const pages = await globby([
      'pages/**/*.tsx', // Capture all .tsx files
      'data/**/blog/**/*.mdx', // Updated pattern to capture blog posts in any language
      'data/**/blog/**/*.md', // Updated pattern to capture blog posts in Markdown
      'data/**/project/**/*.mdx', // Updated pattern for project posts
      'data/**/project/**/*.md', // Updated pattern for project posts in Markdown
      '!pages/_*.tsx',
      '!pages/api/**',
    ])

    console.log('Found pages:', pages) // Debugging output

    const urls = pages
      .map((page) => {
        const path = page
          .replace('pages/', '/')
          .replace('data/', '/') // Adjusted to handle general 'data' folder
          .replace(/(\.tsx|\.mdx|\.md)$/, '')
          .replace('/feed.xml', '')

        console.log('Processed path:', path) // Debugging output

        if (
          page.includes('404.tsx') ||
          page.includes('[...slug].tsx') ||
          page.includes('[tag].tsx')
        ) {
          return null
        }

        const url = {
          loc: `${config.siteUrl}${path}`,
          changefreq: 'weekly',
          priority: 0.5,
          lastmod: new Date().toISOString(),
        }

        console.log('URL object:', url) // Debugging output
        return url
      })
      .filter(Boolean)

    console.log('URLs to be added to the sitemap:', urls) // Debugging output

    const sitemapString = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
      .map(
        (url) =>
          `<url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`
      )
      .join('')}</urlset>`
    const formattedUrls = await prettier.format(sitemapString, {
      ...prettierConfig,
      parser: 'html',
    })
    console.log('Write content : ', formattedUrls)

    fs.writeFileSync(`${config.outDir}/sitemap.xml`, formattedUrls)
    console.log('Sitemap generated successfully in `public/sitemap.xml`.')

    return [] // Returning empty since we're writing the sitemap manually
  },
}
