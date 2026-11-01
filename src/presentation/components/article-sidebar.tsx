import { useMemo, useState } from 'react'
import { experiencePath, type ExperienceArticle } from '../pages/experience-data'
import { toHref } from '../routes'

type ArticleSidebarProps = Readonly<{ currentSlug: string, articles: readonly ExperienceArticle[] }>

function SearchIcon() { return <svg aria-hidden="true" className="size-[18px] fill-none stroke-current stroke-[1.7]" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.2 4.2" /></svg> }

export function ArticleSidebar({ currentSlug, articles }: ArticleSidebarProps) {
  const [query, setQuery] = useState('')
  const available = articles.filter((article) => article.slug !== currentSlug)
  const matches = useMemo(() => available.filter((article) => article.title.toLocaleLowerCase('es').includes(query.trim().toLocaleLowerCase('es'))), [available, query])
  const visibleArticles = query.trim() ? matches : available.slice(0, 5)
  return <aside className="article-sidebar" aria-label="Artículos más leídos"><form className="article-search" role="search" onSubmit={(event) => event.preventDefault()}><label htmlFor="article-search">Buscar artículos</label><div><input id="article-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar" /><SearchIcon /></div></form><div className="article-sidebar__heading"><h2>{query.trim() ? 'Resultados' : 'Más leídos'}</h2><span>{visibleArticles.length}</span></div><ul>{visibleArticles.map((article) => <li key={article.slug}><a href={toHref(experiencePath(article))}><b>{article.title}</b><time>{article.publishedAt}</time></a></li>)}</ul>{query.trim() && visibleArticles.length === 0 && <p className="article-sidebar__empty">No encontramos artículos con ese término.</p>}</aside>
}
