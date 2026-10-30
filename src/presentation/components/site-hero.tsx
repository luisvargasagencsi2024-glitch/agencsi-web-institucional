import { useState } from 'react'
import type { SiteContent } from '../../domain/entities/site-content'
import { ArrowIcon } from './icons'

type SiteHeroProps = Readonly<{ content: SiteContent }>

const heroPhotos = [
  'photo-1551836022-d5d88e9218df',
  'photo-1556761175-4b46a572b786',
  'photo-1524178232363-1fb2b075b655',
  'photo-1556761175-b413da4baf72',
]
const headlines = [
  '',
  'Tecnología útil que responde a una necesidad real.',
  'Capacidades que impulsan a las personas y los equipos.',
  'Instituciones más ágiles, cercanas y eficaces.',
]
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=85`

function SlideArrow({ direction }: { direction: 'previous' | 'next' }) {
  return <svg aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.7]" viewBox="0 0 24 24"><path d={direction === 'previous' ? 'm14.5 5-7 7 7 7' : 'm9.5 5 7 7-7 7'} /></svg>
}

function titleClasses(title: string) {
  if (title.length > 64) return '!max-w-[21ch] !min-h-[4.05em]'
  if (title.length > 50) return '!max-w-[19ch] !min-h-[4.05em]'
  return '!max-w-[17ch] !min-h-[4.05em]'
}

export function SiteHero({ content }: SiteHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const slides = content.services.map((service, index) => ({ ...service, headline: index === 0 ? content.heroTitle : headlines[index], description: index === 0 ? content.heroDescription : service.summary, image: photo(heroPhotos[index]), alt: `Equipo de ${service.name.toLowerCase()} trabajando en una sesión colaborativa` }))
  const activeSlide = slides[activeIndex]
  const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + slides.length) % slides.length)
  const activeTitleClasses = titleClasses(activeSlide.headline)

  return <section className="hero ruled-surface relative" id="inicio" aria-roledescription="carrusel"><div className="page-frame hero__grid min-[901px]:!h-[510px] min-[901px]:!min-h-0" aria-live="polite"><div className="hero__copy !self-start !pb-0 !pt-16 min-[901px]:!pt-[62px]"><p className="section-label">{activeSlide.name}</p><h1 className={activeTitleClasses}>{activeSlide.headline}</h1><p>{activeSlide.description}</p><div className="hero__actions"><a className="button" href={activeSlide.href}>Conocer {activeSlide.name} <ArrowIcon /></a><a className="button button--quiet" href="#contacto">Conversemos</a></div></div><div className="hero__media min-[901px]:!h-full"><img key={activeSlide.image} src={activeSlide.image} alt={activeSlide.alt} /></div></div><button type="button" aria-label="Diapositiva anterior" onClick={() => move(-1)} className="absolute left-3 top-[calc(50%-30px)] z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/45 text-white transition-colors hover:bg-white hover:text-deep focus-visible:outline-white sm:left-6"><SlideArrow direction="previous" /></button><button type="button" aria-label="Diapositiva siguiente" onClick={() => move(1)} className="absolute right-3 top-[calc(50%-30px)] z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/45 text-white transition-colors hover:bg-white hover:text-deep focus-visible:outline-white sm:right-6"><SlideArrow direction="next" /></button><div className="service-strip relative grid grid-cols-2 bg-white sm:grid-cols-4">{slides.map((slide, index) => <button type="button" key={slide.name} onClick={() => setActiveIndex(index)} aria-selected={activeIndex === index} className={`relative min-h-[60px] border-b border-r border-line px-4 text-center text-[11px] font-bold tracking-[.01em] transition-colors focus-visible:outline-accent last:border-r-0 sm:border-b-0 ${activeIndex === index ? 'bg-mist text-deep' : 'bg-white text-[#66757c] hover:bg-mist hover:text-deep'}`}><span>{slide.name}</span><span className={`absolute inset-x-0 bottom-0 h-[3px] bg-accent transition-transform ${activeIndex === index ? 'scale-x-100' : 'scale-x-0'}`} /></button>)}</div></section>
}
