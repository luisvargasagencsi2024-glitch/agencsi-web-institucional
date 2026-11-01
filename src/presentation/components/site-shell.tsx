import type { SiteContent } from '../../domain/entities/site-content'
import { SiteHero } from './site-hero'
import { ArrowIcon } from './icons'
import { routes, toHref } from '../routes'

type SiteShellProps = Readonly<{ content: SiteContent }>
const photo = (id: string, width: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const photos = { hero: photo('photo-1551836022-d5d88e9218df', 1400), conversation: photo('photo-1556761175-b413da4baf72', 1200), solutions: photo('photo-1556761175-4b46a572b786', 1200), perspectiveOne: photo('photo-1542744173-8e7e53415bb0', 900), perspectiveTwo: photo('photo-1551434678-e076c223a692', 900), contact: photo('photo-1497366754035-f200968a6e72', 1600) }
function FeatureIcon({ type }: { type: string }) {
  if (type === 'Consultoría') return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M3 20c.6-3 2.3-5 5-5s4.4 2 5 5M11 20c.5-2 2-3.5 4.5-3.5 2.8 0 4.6 1.5 5.5 3.5" /></svg>
  if (type === 'Soluciones') return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="1" /><path d="M2 20h20M9 16l-1 4M15 16l1 4" /></svg>
  if (type === 'Formación') return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 12v4c2.8 2.2 7.2 2.2 10 0v-4M21 10v5" /></svg>
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 21V7l7-4 7 4v14M9 21v-4h6v4M8 10h2M14 10h2M8 14h2M14 14h2" /></svg>
}
function StepIcon({ index }: { index: number }) {
  const icons = [
    <><circle cx="10" cy="10" r="5.5" /><path d="m14 14 5 5" /></>,
    <><path d="M7 3.5h7l3 3v14H7z" /><path d="M14 3.5v4h4M10 11h4M10 14h4M10 17h2" /></>,
    <><path d="M9 6h10M9 12h10M9 18h10" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></>,
    <><circle cx="12" cy="12" r="3.25" /><path d="M12 3.5v2.1M12 18.4v2.1M20.5 12h-2.1M5.6 12H3.5M18 6l-1.5 1.5M7.5 16.5 6 18M18 18l-1.5-1.5M7.5 7.5 6 6" /></>,
    <><path d="M4 19V12h3v7M10.5 19V7h3v12M17 19V3h3v16" /></>,
  ]
  return <span className="step-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{icons[index]}</svg></span>
}
function Intro() { return <section className="intro section" id="nosotros"><div className="page-frame two-column"><div className="prose"><h2>Antes de implementar, comprendemos.</h2><p>Escuchamos, analizamos y trabajamos junto a cada organización para entender su realidad, identificar oportunidades y diseñar soluciones viables.</p><a className="text-link" href={toHref(routes.experience)}>Conocer más sobre nosotros <ArrowIcon /></a></div><figure className="photo-frame"><img src={photos.conversation} alt="Reunión de consultoría entre profesionales" /></figure></div></section> }
function Methodology({ content }: SiteShellProps) {
  const descriptions = [
    'Entendemos el contexto, los retos y las oportunidades.',
    'Definimos la estrategia y la solución más adecuada.',
    'Establecemos un plan realista y medible.',
    'Ejecutamos con un enfoque colaborativo y de transferencia de capacidades.',
    'Medimos resultados y aseguramos la sostenibilidad de los avances.',
  ]
  return <section className="methodology" id="metodologia"><div className="page-frame"><p className="methodology__label">Metodología</p><div className="methodology__heading"><h2>Una forma clara de avanzar.</h2><p>Un enfoque práctico y colaborativo que nos permite pasar del análisis a resultados concretos.</p></div><ol>{content.methodology.map((step, index) => <li key={step}><StepIcon index={index} /><div><b>{step}</b><p>{descriptions[index]}</p></div></li>)}</ol></div></section>
}
function Statement() { return <section className="statement ruled-surface"><div className="page-frame"><h2>Estrategia clara. Tecnología útil.<br />Capacidades sostenibles.</h2><span /><p>Acompañamos hoy la transformación que genera valor real mañana.</p></div></section> }
function Services({ content }: SiteShellProps) { return <section className="services section" id="consultoria"><div className="page-frame"><div className="section-heading"><h2>Lo que hacemos.</h2><p>Cuatro líneas integradas para ayudar a empresas e instituciones públicas a avanzar con claridad y confianza.</p></div><div className="service-grid">{content.services.map((service) => <a className="service-link" href={toHref(service.href)} key={service.name}><FeatureIcon type={service.name} /><span><b>{service.name}</b><small>{service.summary}</small></span><ArrowIcon /></a>)}</div></div></section> }
function Solutions() { return <section className="solutions section"><div className="page-frame two-column two-column--reversed"><figure className="photo-frame"><img src={photos.solutions} alt="Profesional trabajando con una computadora portátil" /></figure><div className="prose"><h2>Tecnología que responde a una necesidad real.</h2><p>Desarrollamos e implementamos soluciones digitales que se adaptan a la realidad de cada organización, con un enfoque práctico, seguro y orientado a la eficiencia.</p><ul className="solution-list"><li>Tiendas virtuales <ArrowIcon /></li><li>Páginas web <ArrowIcon /></li><li>Software empresarial <ArrowIcon /></li><li>Automatización e IA <ArrowIcon /></li></ul></div></div></section> }
function Perspectives() { return <section className="perspectives section" id="perspectivas"><div className="page-frame"><div className="section-heading"><h2>Ideas y experiencias<br />para impulsar el cambio.</h2><p>Reflexiones, análisis y aprendizajes sobre estrategia, tecnología y gestión.</p></div><div className="perspective-grid"><a href={toHref(routes.perspectives)} className="perspective-card"><img src={photos.perspectiveOne} alt="Profesionales revisando información en una reunión" /><span><b>Estrategia en un entorno de mayor incertidumbre</b><small>Claves para tomar mejores decisiones y mantener el foco en lo que genera valor.</small><ArrowIcon /></span></a><a href={toHref(routes.perspectives)} className="perspective-card"><img src={photos.perspectiveTwo} alt="Profesionales colaborando en una oficina" /><span><b>Transformación digital en el sector público</b><small>Oportunidades y retos para una gestión más eficiente y cercana.</small><ArrowIcon /></span></a></div></div></section> }
function Contact() { return <section className="contact ruled-surface" id="contacto"><div className="page-frame contact__inner"><div><h2>El cambio comienza<br />con una conversación.</h2><p>Cuéntanos sobre tus retos. Conversemos sobre cómo podemos acompañar tus objetivos.</p><a className="button" href="mailto:contacto@agencsi.com">Contactar a AGENCSI <ArrowIcon /></a></div><div className="contact__image"><img src={photos.contact} alt="Espacio de trabajo contemporáneo" /></div></div></section> }
export function HomeSections({ content }: SiteShellProps) { return <><SiteHero content={content} /><Intro /><Methodology content={content} /><Statement /><Services content={content} /><Solutions /><Perspectives /><Contact /></> }
