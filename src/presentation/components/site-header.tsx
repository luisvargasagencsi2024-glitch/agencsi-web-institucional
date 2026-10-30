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

export function SiteHeader({ content }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => { document.documentElement.dataset.theme = isDark ? 'dark' : 'light' }, [isDark])

  return <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-deep/95 text-white shadow-[0_10px_28px_rgb(20_37_45_/_18%)] backdrop-blur-md"><div className="page-frame relative flex min-h-[76px] items-center gap-5"><BrandMark content={content} className="shrink-0" /><button className="ml-auto grid size-10 place-items-center rounded-md border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline-white lg:hidden" type="button" aria-expanded={isOpen} aria-controls="main-menu" onClick={() => setIsOpen(!isOpen)}><MenuIcon open={isOpen} /><span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span></button><nav id="main-menu" className={`${isOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-white/10 bg-deep px-5 py-4 shadow-2xl lg:static lg:ml-auto lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`} aria-label="Navegación principal"><NavLink href="#inicio" onNavigate={closeMenu}>Inicio</NavLink><NavLink href="#nosotros" onNavigate={closeMenu}>Nosotros</NavLink><div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}><button type="button" aria-expanded={isServicesOpen} onClick={() => setIsServicesOpen(!isServicesOpen)} className={`flex w-full items-center justify-between gap-1 lg:w-auto ${navItemClass}`}>Líneas de negocio <ChevronDownIcon /></button><div className={`${isServicesOpen ? 'grid' : 'hidden'} mt-1 gap-1 rounded-lg border border-white/10 bg-[#1b3039] p-2 shadow-2xl lg:absolute lg:left-0 lg:top-full lg:mt-0 lg:w-[320px]`}>{content.services.map((service) => <a key={service.name} href={service.href} onClick={() => { setIsServicesOpen(false); closeMenu() }} className="group grid grid-cols-[1fr_auto] gap-x-4 rounded-md px-3 py-3 transition-colors hover:bg-white/8 focus-visible:outline-white"><span><b className="block text-[14px] font-semibold text-white">{service.name}</b><small className="mt-1 block text-[12px] leading-[1.45] text-white/60">{service.summary}</small></span><ArrowIcon /></a>)}</div></div><NavLink href="#metodologia" onNavigate={closeMenu}>Metodología</NavLink><NavLink href="#experiencia" onNavigate={closeMenu}>Experiencia</NavLink></nav><button type="button" className="theme-toggle hidden size-9 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-current transition-colors hover:bg-transparent hover:text-accent focus-visible:outline-accent lg:inline-flex" aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'} aria-pressed={isDark} onClick={() => setIsDark((value) => !value)}><ThemeIcon dark={isDark} /></button><a className="button !hidden shrink-0 lg:!inline-flex" href="#contacto">Conversemos</a></div></header>
}
