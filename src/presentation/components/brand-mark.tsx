import type { SiteContent } from '../../domain/entities/site-content'
import { routes, toHref } from '../routes'

export function BrandMark({ content, className = '' }: { content: SiteContent, className?: string }) {
  return <a className={`brand-mark ${className}`} href={toHref(routes.home)} aria-label="Ir al inicio de Agencsi">
    <img src="/agencsi-logo.svg" alt={content.name} />
    <span className="brand-mark__divider" aria-hidden="true">|</span>
    <span className="brand-mark__tagline">With you before<br />and after</span>
  </a>
}
