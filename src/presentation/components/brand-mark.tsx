import type { SiteContent } from '../../domain/entities/site-content'

export function BrandMark({ content, className = '' }: { content: SiteContent, className?: string }) {
  return <a className={`brand-mark ${className}`} href="#inicio" aria-label="Ir al inicio de Agencsi">
    <img src="https://agencsi.com/wp-content/uploads/2021/08/logo-oficial-agencsi-blanco.svg" alt={content.name} />
    <span className="brand-mark__divider" aria-hidden="true">|</span>
    <span className="brand-mark__tagline">With you before<br />and after</span>
  </a>
}
