import type { SiteContent } from '../../domain/entities/site-content'

type SiteShellProps = Readonly<{
  content: SiteContent
}>

export function SiteShell({ content }: SiteShellProps) {
  return (
    <main className="site-shell">
      <section className="site-shell__content" aria-labelledby="site-title">
        <p className="site-shell__brand">{content.name}</p>
        <h1 id="site-title">{content.statusMessage}</h1>
        <p className="site-shell__hint">{content.hint}</p>
      </section>
    </main>
  )
}
