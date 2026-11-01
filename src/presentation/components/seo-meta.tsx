import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { experienceArticles, experiencePath } from '../pages/experience-data'

type SeoData = Readonly<{ title: string, description: string, image?: string, type?: 'website' | 'article', publishedAt?: string }>

const siteName = 'AGENCSI'
const defaultImage = 'https://agencsi.com/wp-content/uploads/2023/03/638e640ac8b2c.jpeg'

const pages: Record<string, SeoData> = {
  '/': { title: 'AGENCSI | Estrategias, soluciones y capacidades', description: 'Acompañamos a empresas e instituciones públicas a desarrollar estrategias, soluciones y capacidades para un futuro mejor.' },
  '/nosotros': { title: 'Nosotros | AGENCSI', description: 'Conoce al equipo y el propósito que guía el trabajo de AGENCSI.' },
  '/lineas-de-negocio': { title: 'Líneas de negocio | AGENCSI', description: 'Consultoría, soluciones y formación para impulsar cambios sostenibles.' },
  '/consultoria': { title: 'Consultoría | AGENCSI', description: 'Transformamos desafíos en estrategias, soluciones y capacidades.' },
  '/soluciones': { title: 'Soluciones | AGENCSI', description: 'Diseñamos soluciones tecnológicas útiles desde la realidad de cada organización.' },
  '/formacion': { title: 'Formación | AGENCSI', description: 'Fortalecemos capacidades para sostener el cambio y aprender mientras avanzamos.' },
  '/sector-publico': { title: 'Sector público | AGENCSI', description: 'Impulsamos una gestión pública centrada en las personas y sus necesidades.' },
  '/metodologia': { title: 'Metodología | AGENCSI', description: 'Una forma clara, colaborativa y práctica de avanzar hacia resultados sostenibles.' },
  '/experiencia': { title: 'Experiencia | AGENCSI', description: 'Ideas, casos y reflexiones para comprender los desafíos de transformación.' },
  '/perspectivas': { title: 'Perspectivas | AGENCSI', description: 'Ideas y experiencias para impulsar el cambio.' },
  '/contacto': { title: 'Contacto | AGENCSI', description: 'Conversemos sobre los desafíos y oportunidades de tu organización.' },
}

function photo(image?: string) { return image?.startsWith('http') ? image : defaultImage }
function setMeta(selector: string, attribute: 'name' | 'property', value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, selector.match(/="([^"]+)/)?.[1] ?? ''); document.head.appendChild(element) }
  element.content = value
}

export function SeoMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    const article = experienceArticles.find((item) => experiencePath(item) === normalized) ?? (normalized.startsWith('/experiencias/') ? experienceArticles.find((item) => item.slug === normalized.split('/').at(-1)) : undefined)
    const data: SeoData = article ? { title: `${article.title} | ${siteName}`, description: article.summary, image: photo(article.image), type: 'article', publishedAt: article.publishedAt } : pages[normalized] ?? pages['/']
    const canonical = window.location.href.split(/[?#]/)[0]
    document.title = data.title
    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) { canonicalLink = document.createElement('link'); canonicalLink.rel = 'canonical'; document.head.appendChild(canonicalLink) }
    canonicalLink.href = canonical
    setMeta('meta[name="description"]', 'name', data.description)
    setMeta('meta[name="robots"]', 'name', 'index, follow')
    setMeta('meta[property="og:title"]', 'property', data.title)
    setMeta('meta[property="og:description"]', 'property', data.description)
    setMeta('meta[property="og:type"]', 'property', data.type ?? 'website')
    setMeta('meta[property="og:url"]', 'property', canonical)
    setMeta('meta[property="og:image"]', 'property', photo(data.image))
    setMeta('meta[property="og:site_name"]', 'property', siteName)
    setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', data.title)
    setMeta('meta[name="twitter:description"]', 'name', data.description)
    setMeta('meta[name="twitter:image"]', 'name', photo(data.image))
    const schema = article ? { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.summary, image: photo(article.image), datePublished: article.publishedAt, author: { '@type': 'Organization', name: article.author }, publisher: { '@type': 'Organization', name: siteName }, mainEntityOfPage: canonical } : { '@context': 'https://schema.org', '@type': 'Organization', name: siteName, url: canonical, description: data.description }
    let script = document.getElementById('agencsi-seo-schema') as HTMLScriptElement | null
    if (!script) { script = document.createElement('script'); script.id = 'agencsi-seo-schema'; script.type = 'application/ld+json'; document.head.appendChild(script) }
    script.text = JSON.stringify(schema)
  }, [pathname])
  return null
}
