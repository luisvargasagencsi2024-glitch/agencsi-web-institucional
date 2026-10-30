import { useEffect, useState, type ReactNode } from 'react'
import type { SiteContent } from '../../domain/entities/site-content'
import { BrandMark } from './brand-mark'
import { ArrowIcon, ChevronDownIcon, MenuIcon } from './icons'

type SiteHeaderProps = Readonly<{ content: SiteContent }>

const navItemClass = 'header-nav-item rounded-md px-3 py-2 text-white/75 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-white lg:px-2.5'

function NavLink({ href, children, onNavigate }: { href: string, children: ReactNode, onNavigate: () => void }) {
  return <a href={href} onClick={onNavigate} className={navItemClass}>{children}</a>
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return <svg aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24">{dark ? <><circle cx="12" cy="12" r="3.5" /><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.72 5.28l-1.42 1.42M6.7 17.3l-1.42 1.42M18.72 18.72l-1.42-1.42M6.7 6.7 5.28 5.28" /></> : <path d="M20.5 14.25A8.25 8.25 0 0 1 9.75 3.5 8.5 8.5 0 1 0 20.5 14.25Z" />}</svg>
}
function CollapseIcon({ open }: { open: boolean }) { return <svg aria-hidden="true" className="size-[18px] fill-none stroke-current stroke-[1.7]" viewBox="0 0 24 24"><path d="M5 12h14" />{!open && <path d="M12 5v14" />}</svg> }
function ConversationIcon() { return <svg aria-hidden="true" className="size-[17px] fill-none stroke-current stroke-[1.75]" viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.48 8.5 8.5 0 0 1-3.15-.63L4 20l1.55-4.1A7.42 7.42 0 0 1 4.5 12a7.5 7.5 0 0 1 15.5-.5Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></svg> }

export function SiteHeader({ content }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const closeMenu = () => { setIsOpen(false); setIsMobileServicesOpen(false) }
  const toggleTheme = () => setIsDark((value) => !value)

  useEffect(() => { document.documentElement.dataset.theme = isDark ? 'dark' : 'light' }, [isDark])
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [isOpen])
  useEffect(() => { if (!isOpen) return; const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') closeMenu() }; window.addEventListener('keydown', closeOnEscape); return () => window.removeEventListener('keydown', closeOnEscape) }, [isOpen])

  return <>
    <header className="site-header fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-deep/95 text-white shadow-[0_10px_28px_rgb(20_37_45_/_18%)] backdrop-blur-md">
      <div className="page-frame relative flex min-h-[76px] items-center gap-5">
        <BrandMark content={content} className="shrink-0" />
        <button type="button" className="theme-toggle ml-auto grid size-9 shrink-0 place-items-center border-0 bg-transparent p-0 text-current transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-accent lg:hidden" aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} aria-pressed={isDark} onClick={toggleTheme}><ThemeIcon dark={isDark} /></button><button className="grid size-9 place-items-center rounded-md border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline-white lg:hidden" type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(true)}><MenuIcon open={false} /><span className="sr-only">Abrir menú</span></button>
        <nav className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-1" aria-label="Navegación principal">
          <NavLink href="#inicio" onNavigate={closeMenu}>Inicio</NavLink><NavLink href="#nosotros" onNavigate={closeMenu}>Nosotros</NavLink>
          <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}><button type="button" aria-expanded={isServicesOpen} onClick={() => setIsServicesOpen(!isServicesOpen)} className={`flex items-center gap-1 lg:w-auto ${navItemClass}`}>Líneas de negocio <ChevronDownIcon /></button><div className={`${isServicesOpen ? 'grid' : 'hidden'} mt-1 gap-1 rounded-lg border border-white/10 bg-[#1b3039] p-2 shadow-2xl lg:absolute lg:left-0 lg:top-full lg:mt-0 lg:w-[320px]`}>{content.services.map((service) => <a key={service.name} href={service.href} onClick={closeMenu} className="group grid grid-cols-[1fr_auto] gap-x-4 rounded-md px-3 py-3 transition-colors hover:bg-white/8 focus-visible:outline-white"><span><b className="block text-[14px] font-semibold text-white">{service.name}</b><small className="mt-1 block text-[12px] leading-[1.45] text-white/60">{service.summary}</small></span><ArrowIcon /></a>)}</div></div>
          <NavLink href="#metodologia" onNavigate={closeMenu}>Metodología</NavLink><NavLink href="#experiencia" onNavigate={closeMenu}>Experiencia</NavLink>
        </nav>
        <button type="button" className="theme-toggle hidden size-9 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-current transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-accent lg:inline-flex" aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} aria-pressed={isDark} onClick={toggleTheme}><ThemeIcon dark={isDark} /></button><a className="button !hidden shrink-0 lg:!inline-flex" href="#contacto">Conversemos</a>
      </div>
    </header><div aria-hidden="true" className="h-[76px]" />

    <div className={`fixed inset-0 z-[80] overflow-hidden lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button type="button" aria-label="Cerrar menú" onClick={closeMenu} className={`absolute inset-0 bg-deep/45 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      <aside id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Menú principal" className={`mobile-nav-panel absolute right-0 top-0 flex h-[100dvh] w-[min(88vw,380px)] flex-col overflow-visible shadow-[-18px_0_42px_rgb(20_37_45_/_18%)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${isDark ? 'mobile-nav-panel--dark bg-deep text-white' : 'mobile-nav-panel--light bg-white text-deep'} ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+2px)] opacity-0'}`}>
        <svg className="mobile-nav-watermark" aria-hidden="true" viewBox="0 0 646 783"><polygon points="292.88,177.77 179.03,429.84 155.9,481.21 80.36,648.4 0,648.4 292.58,0 645.5,782.37 564.98,782.37 430.74,481.23 407.31,429.86" /></svg>
        <button type="button" onClick={closeMenu} className={`mobile-nav-close absolute -left-10 top-3 z-20 grid size-8 place-items-center rounded-md border border-white/35 bg-deep text-white shadow-lg transition-opacity duration-200 focus-visible:outline-white ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}><MenuIcon open /><span className="sr-only">Cerrar menú</span></button>
        <a className="button mobile-nav-cta relative z-10" href="#contacto" onClick={closeMenu}><ConversationIcon /><span>Conversemos</span></a>
        <div className="relative z-10 flex flex-1 flex-col overflow-x-hidden overflow-y-auto px-6 pb-6"><nav className="mt-4 grid" aria-label="Navegación móvil"><a href="#inicio" onClick={closeMenu} className="mobile-nav-link">Inicio</a><a href="#nosotros" onClick={closeMenu} className="mobile-nav-link">Nosotros</a><div><button type="button" aria-expanded={isMobileServicesOpen} onClick={() => setIsMobileServicesOpen((open) => !open)} className="mobile-nav-link flex w-full items-center justify-between">Líneas de negocio <CollapseIcon open={isMobileServicesOpen} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isMobileServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><div className="pb-2 pl-4"><div className="grid gap-1">{content.services.map((service) => <a key={service.name} href={service.href} onClick={closeMenu} className="mobile-nav-service"><span>{service.name}</span></a>)}</div></div></div></div></div><a href="#metodologia" onClick={closeMenu} className="mobile-nav-link">Metodología</a><a href="#experiencia" onClick={closeMenu} className="mobile-nav-link">Experiencia</a></nav>
        <div className="mt-auto border-t border-current/15 pt-5"><BrandMark content={content} /></div></div>
      </aside>
    </div>
  </>
}
