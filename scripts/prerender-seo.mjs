import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const origin = 'https://agencsi-web-institucional-jade.vercel.app'
const source = await readFile('src/presentation/pages/experience-data.ts', 'utf8')
const template = await readFile('dist/index.html', 'utf8')
const entries = source.split(/\n\s*\{\s*\n?\s*slug: '/).slice(1)

const escape = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const replaceTag = (html, selector, value) => html.replace(new RegExp(`(<meta ${selector} content=")[^"]*(")`), `$1${escape(value)}$2`)
const coursePages = [
  {
    path: '/formacion/curso/programacion-con-ia',
    title: 'Programa con IA. De la idea a una solución real. | Curso de programación con IA | AGENCSI',
    description: 'Aprende a diseñar, programar y publicar un proyecto digital funcional para un negocio o necesidad real, incluso si estás empezando desde cero.',
    image: '/yimmi-urbano.png',
    keywords: 'curso de programación con IA, inteligencia artificial, desarrollo web, MVP, formación virtual, AGENCSI',
    price: '180',
  },
]

function withCourseSeo(course) {
  const url = `${origin}${course.path}`
  const image = `${origin}${course.image}`
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Programa con IA. De la idea a una solución real.',
    description: course.description,
    image,
    provider: { '@type': 'Organization', name: 'AGENCSI', url: origin },
    inLanguage: 'es-PE',
    offers: { '@type': 'Offer', price: course.price, priceCurrency: 'PEN', availability: 'https://schema.org/InStock', url },
  }).replace(/</g, '\\u003c')
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(course.title)}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(course.description)}$2`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = replaceTag(html, 'property="og:title"', course.title)
  html = replaceTag(html, 'property="og:description"', course.description)
  html = replaceTag(html, 'property="og:type"', 'website')
  html = replaceTag(html, 'property="og:url"', url)
  html = replaceTag(html, 'property="og:image"', image)
  html = replaceTag(html, 'name="twitter:title"', course.title)
  html = replaceTag(html, 'name="twitter:description"', course.description)
  html = replaceTag(html, 'name="twitter:image"', image)
  html = html.replace('</head>', `    <meta name="keywords" content="${escape(course.keywords)}" />\n  </head>`)
  html = html.replace(/<script id="agencsi-static-schema" type="application\/ld\+json">[^<]*<\/script>/, `<script id="agencsi-static-schema" type="application/ld+json">${schema}</script>`)
  return html
}

for (const entry of entries) {
  const slug = entry.match(/^([^']+)/)?.[1]
  const title = entry.match(/title: '([^']+)'/)?.[1]
  const summary = entry.match(/summary: '([^']+)'/)?.[1]
  const image = entry.match(/image: '([^']+)'/)?.[1]
  if (!slug || !title || !summary || !image) continue
  const path = `/${slug}`
  const url = `${origin}${path}`
  const imageUrl = image.startsWith('http') ? image : `${origin}${image}`
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

for (const course of coursePages) {
  const output = join('dist', ...course.path.split('/').filter(Boolean))
  await mkdir(output, { recursive: true })
  await writeFile(join(output, 'index.html'), withCourseSeo(course))
}
