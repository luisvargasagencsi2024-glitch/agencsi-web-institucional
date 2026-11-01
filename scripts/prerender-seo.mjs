import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const origin = 'https://agencsi-web-institucional-jade.vercel.app'
const source = await readFile('src/presentation/pages/experience-data.ts', 'utf8')
const template = await readFile('dist/index.html', 'utf8')
const entries = source.split(/\n\s*\{\s*\n?\s*slug: '/).slice(1)

const escape = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const replaceTag = (html, selector, value) => html.replace(new RegExp(`(<meta ${selector} content=")[^"]*(")`), `$1${escape(value)}$2`)

for (const entry of entries) {
  const slug = entry.match(/^([^']+)/)?.[1]
  const title = entry.match(/title: '([^']+)'/)?.[1]
  const summary = entry.match(/summary: '([^']+)'/)?.[1]
  const image = entry.match(/image: '([^']+)'/)?.[1]
  if (!slug || !title || !summary || !image) continue
  const path = `/${slug}`
  const url = `${origin}${path}`
  const imageUrl = image.startsWith('http') ? image : 'https://agencsi.com/wp-content/uploads/2023/03/638e640ac8b2c.jpeg'
  const seoTitle = `${title} | AGENCSI`
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(seoTitle)}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(summary)}$2`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = replaceTag(html, 'property="og:title"', seoTitle)
  html = replaceTag(html, 'property="og:description"', summary)
  html = replaceTag(html, 'property="og:type"', 'article')
  html = replaceTag(html, 'property="og:url"', url)
  html = replaceTag(html, 'property="og:image"', imageUrl)
  html = replaceTag(html, 'name="twitter:title"', seoTitle)
  html = replaceTag(html, 'name="twitter:description"', summary)
  html = replaceTag(html, 'name="twitter:image"', imageUrl)
  const output = join('dist', slug)
  await mkdir(output, { recursive: true })
  await writeFile(join(output, 'index.html'), html)
}
