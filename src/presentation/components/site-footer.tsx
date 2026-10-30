import { useState, type ReactNode } from 'react'
import type { SiteContent } from '../../domain/entities/site-content'
import { BrandMark } from './brand-mark'
import { ArrowIcon } from './icons'

type SiteFooterProps = Readonly<{ content: SiteContent }>

function MailIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4.5 7 7.5 6 7.5-6" /></svg> }
function CollapseIcon({ open }: { open: boolean }) { return <svg aria-hidden="true" className="footer__accordion-chevron" viewBox="0 0 24 24"><path d="M5 12h14" />{!open && <path d="M12 5v14" />}</svg> }
function SocialIcon({ name }: { name: 'facebook' | 'linkedin' | 'twitter' | 'instagram' | 'youtube' }) {
  const paths = {
    facebook: <path d="M13.8 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7v2.1H8.6V13H11v7h2.8Z" />,
    linkedin: <><path d="M6.2 9.5V18M6.2 6.5v.1M10.4 18v-4.7c0-2.5 3.5-2.7 3.5 0V18M10.4 12.1c.5-1.7 5.2-2.2 5.2 1.2V18" /></>,
    twitter: <path d="M19.1 7.3c-.6.3-1.2.4-1.8.5.7-.4 1.1-1 1.3-1.7-.6.4-1.3.7-2 .8a3 3 0 0 0-5.2 2.1c0 .2 0 .5.1.7a8.5 8.5 0 0 1-6.2-3.1 3 3 0 0 0 .9 4 3 3 0 0 1-1.4-.4 3 3 0 0 0 2.5 3 3 0 0 1-1.4.1 3 3 0 0 0 2.8 2.1 6.1 6.1 0 0 1-3.8 1.3H4.2a8.6 8.6 0 0 0 4.7 1.4c5.6 0 8.7-4.7 8.7-8.7v-.4c.6-.4 1.1-1 1.5-1.6Z" />,
    instagram: <><rect x="5" y="5" width="14" height="14" rx="3" /><circle cx="12" cy="12" r="3.2" /><circle cx="16.4" cy="7.7" r=".8" /></>,
    youtube: <><path d="M19.2 8.1a2 2 0 0 0-1.4-1.4C16.5 6.3 12 6.3 12 6.3s-4.5 0-5.8.4A2 2 0 0 0 4.8 8.1 20 20 0 0 0 4.5 12c0 1.3.1 2.6.3 3.9a2 2 0 0 0 1.4 1.4c1.3.4 5.8.4 5.8.4s4.5 0 5.8-.4a2 2 0 0 0 1.4-1.4c.2-1.3.3-2.6.3-3.9s-.1-2.6-.3-3.9Z" /><path d="m10.3 9.6 4 2.4-4 2.4V9.6Z" /></>,
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>
}

function FooterAccordion({ label, open, onToggle, children }: { label: string, open: boolean, onToggle: () => void, children: ReactNode }) {
  return <div className={`footer__links footer__accordion ${open ? 'is-open' : ''}`}><button type="button" className="footer__accordion-toggle" aria-expanded={open} onClick={onToggle}><span>{label}</span><CollapseIcon open={open} /></button><div className="footer__accordion-content"><div>{children}</div></div></div>
}

export function SiteFooter({ content }: SiteFooterProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const socials: Array<'facebook' | 'linkedin' | 'twitter' | 'instagram' | 'youtube'> = ['facebook', 'linkedin', 'twitter', 'instagram', 'youtube']
  const toggleGroup = (group: string) => setOpenGroup((current) => current === group ? null : group)
  return <footer className="site-footer ruled-surface"><div className="page-frame footer__grid"><div className="footer__intro"><BrandMark content={content} /><p>Acompañamos a empresas e instituciones públicas a desarrollar estrategias, soluciones y capacidades para un futuro mejor.</p></div><FooterAccordion label="Organización" open={openGroup === 'organization'} onToggle={() => toggleGroup('organization')}><a href="#nosotros">Nosotros</a><a href="#metodologia">Metodología</a><a href="#experiencia" id="experiencia">Experiencia</a><a href="#perspectivas">Perspectivas</a><a href="#contacto">Contacto</a></FooterAccordion><FooterAccordion label="Servicios" open={openGroup === 'services'} onToggle={() => toggleGroup('services')}><a href="#consultoria">Consultoría</a><a href="#soluciones">Soluciones</a><a href="#formacion">Formación</a><a href="#sector-publico">Sector Público</a></FooterAccordion><div className="footer__newsletter"><b>Newsletter</b><a className="footer__email" href="mailto:contacto@agencsi.com"><MailIcon /><span>Tu correo electrónico</span><ArrowIcon /></a><div className="footer__socials" aria-label="Redes sociales"><span className="sr-only">Redes sociales</span>{socials.map((social) => <span aria-hidden="true" key={social}><SocialIcon name={social} /></span>)}</div></div></div><div className="footer__legal"><div className="page-frame"><span>© 2026 <strong>AGENCSI</strong>. Todos los derechos reservados.</span><span><a href="#terminos">Términos y condiciones</a><a href="#privacidad">Política de privacidad</a><a href="#cookies">Cookies</a></span></div></div></footer>
}
