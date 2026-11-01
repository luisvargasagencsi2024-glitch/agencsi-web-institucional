import { useEffect } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import type { SiteContent } from '../domain/entities/site-content'
import { HomePage } from './pages/home-page'
import { AboutPage, BusinessLinesPage, ConsultingPage, ContactPage, ExperiencePage, LegalPage, MethodologyPage, NotFoundPage, PerspectivesPage, PublicSectorPage, SolutionsPage, TrainingPage } from './pages/content-pages'
import { ExperienceArticlePage } from './pages/experience-article-page'
import { experienceArticles, findExperienceArticle, experiencePath } from './pages/experience-data'
import { routes } from './routes'
import { SeoMeta } from './components/seo-meta'

type AppProps = Readonly<{ content: SiteContent }>

function NavigationBridge() {
  const navigate = useNavigate()
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      navigate(`${url.pathname}${url.search}${url.hash}`)
      if (!url.hash) window.scrollTo({ top: 0, behavior: 'instant' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
  return null
}

function PageResolver({ content }: AppProps) {
  const { pathname } = useLocation()
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  const direct = experienceArticles.find((article) => experiencePath(article) === path)
  if (direct) return <ExperienceArticlePage content={content} article={direct} />
  if (path.startsWith('/experiencias/')) { const article = findExperienceArticle(path.split('/').at(-1) ?? ''); return article ? <ExperienceArticlePage content={content} article={article} /> : <NotFoundPage content={content} /> }
  if (path === routes.home) return <HomePage content={content} />
  if (path === routes.about) return <AboutPage content={content} />
  if (path === routes.businessLines) return <BusinessLinesPage content={content} />
  if (path === routes.consulting) return <ConsultingPage content={content} />
  if (path === routes.solutions) return <SolutionsPage content={content} />
  if (path === routes.training) return <TrainingPage content={content} />
  if (path === routes.publicSector) return <PublicSectorPage content={content} />
  if (path === routes.methodology) return <MethodologyPage content={content} />
  if (path === routes.experience) return <ExperiencePage content={content} />
  if (path === routes.perspectives) return <PerspectivesPage content={content} />
  if (path === routes.contact) return <ContactPage content={content} />
  if (path === routes.terms) return <LegalPage content={content} title="Términos y condiciones" />
  if (path === routes.privacy) return <LegalPage content={content} title="Política de privacidad" />
  if (path === routes.cookies) return <LegalPage content={content} title="Cookies" />
  return <NotFoundPage content={content} />
}

export function App({ content }: AppProps) { return <BrowserRouter basename={import.meta.env.BASE_URL}><NavigationBridge /><SeoMeta /><PageResolver content={content} /></BrowserRouter> }
