import type { SiteContent } from '../../domain/entities/site-content'
import { ArticleActions } from '../components/article-actions'
import { ArticleSidebar } from '../components/article-sidebar'
import { ArrowIcon } from '../components/icons'
import { SiteLayout } from '../layouts/site-layout'
import { experienceArticles, experiencePath, type ExperienceArticle } from './experience-data'
import { routes, toHref } from '../routes'

const photo = (id: string) => id.startsWith('http') ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=85`

export function ExperienceArticlePage({ content, article }: { content: SiteContent, article: ExperienceArticle }) {
  const similar = experienceArticles.filter((item) => item.slug !== article.slug).slice(0, 4)
  const emphasis = article.highlights ?? []
  const renderInline = (value: string, key: string) => {
    const pattern = emphasis.length ? new RegExp(`(${emphasis.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g') : null
    return (pattern ? value.split(pattern) : [value]).map((part, index) => emphasis.includes(part) ? <strong key={`${key}-${index}`} className="font-semibold text-[#263d45]">{part}</strong> : part)
  }
  const renderParagraph = (paragraph: string, index: number) => {
    if (paragraph === 'Bibliografía') return <h2 key={paragraph} className="mb-4 mt-10 text-[24px]">Bibliografía</h2>
    if (/^(Ejemplo|Conclusión):$/.test(paragraph)) return <h3 key={paragraph} className="mb-3 mt-8 text-[20px] font-semibold">{paragraph}</h3>
    if (/^Tabla \d+:|^Fuente:/.test(paragraph)) return <p key={paragraph} className="mb-4 text-[13px] italic leading-6 text-slate-500">{paragraph}</p>
    const fragments = paragraph.split(/(https?:\/\/[^\s]+|“[^”]+”)/g)
    return <p key={paragraph} className={index === 0 ? 'mb-8 font-sans text-justify text-[15px] font-bold leading-[1.72] text-[#344a52]' : 'mb-6 text-justify text-[15px] leading-[1.72] text-[#44545a]'}>{fragments.map((fragment, fragmentIndex) => {
      if (/^https?:\/\//.test(fragment)) return <a key={fragmentIndex} className="break-words font-medium text-[#b10b43] underline underline-offset-4" href={fragment} target="_blank" rel="noreferrer">{fragment}</a>
      if (/^“[^”]+”$/.test(fragment)) return <em key={fragmentIndex}>{fragment}</em>
      return renderInline(fragment, `${paragraph}-${fragmentIndex}`)
    })}</p>
  }
  return <SiteLayout content={content}><header className="page-title page-title--article"><div className="page-frame article-title-grid"><div className="article-title-content"><nav className="page-breadcrumb" aria-label="Migas de pan"><a href={toHref(routes.home)}>Inicio</a><span aria-hidden="true">/</span><a href={toHref(routes.experience)}>Experiencia</a><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav><p className="mb-3"><span className="inline-flex rounded-full bg-[#d0134b] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">Artículo de divulgación</span></p><h1>{article.title}</h1><div className="article-meta"><span>Por {article.author}</span><span aria-hidden="true">•</span><span>{article.publishedAt}</span><span aria-hidden="true">•</span><span>{article.readingTime}</span></div><ArticleActions title={article.title} body={article.body} /></div><img className="article-title-image" src={photo(article.image)} alt="" /></div></header><article className="article section"><div className="page-frame article__frame"><div className="article__layout"><div className="article__content"><section className="mb-9 border-b border-slate-200 pb-7"><h2 className="mb-3 text-[24px]">Resumen</h2><p className="m-0 text-justify text-[15px] italic leading-[1.72] text-[#44545a]">{article.summary}</p>{article.keywords && <p className="mt-4 mb-0 text-[13px] leading-6 text-[#44545a]"><strong>Palabras clave:</strong> {article.keywords.join(', ')}.</p>}</section>{article.body.map(renderParagraph)}</div><ArticleSidebar currentSlug={article.slug} articles={experienceArticles} /></div></div></article><section className="similar-experiences section"><div className="page-frame"><div className="similar-experiences__heading"><h2>Experiencias similares.</h2><a className="text-link" href={toHref(routes.experience)}>Ver todas <ArrowIcon /></a></div><div className="similar-experiences__grid">{similar.map((item) => <a key={item.slug} href={toHref(experiencePath(item))}><img src={photo(item.image)} alt="" /><span>{item.readingTime}</span><h3>{item.title}</h3><p>{item.summary}</p><b>Leer experiencia <ArrowIcon /></b></a>)}</div></div></section></SiteLayout>
}
